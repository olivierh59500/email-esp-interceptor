const fetch = require('node-fetch');
const handleError = require('../utils/handleError');
const config = require('../../config');

function setAuth() {
  const auth = new Buffer(`${config.campaignsUsername}:${config.campaignsPassword}`);
  return `Basic ${auth.toString('base64')}`;
}

function generateOptions(method = 'GET', body) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: setAuth()
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
}

function copyHeaders(destination, source, picked = ['X-Per-Page', 'X-Page', 'X-Total-Count']) {
  picked.forEach((pick) => {
    const val = source.headers.get(pick);
    if (val) {
      destination.set(pick, val);
    }
  });
}

function* fetchResourceList(pathname, res, query) {
  const path = query ? `${pathname}?${query}` : pathname;
  const response = yield fetch(config.campaignsHost + path, generateOptions());
  copyHeaders(res, response);
  const json = yield response.json();
  if (response.status >= 300) {
    throw handleError(json.message, response.status);
  }
  return json;
}

function* fetchResourceSingle(pathname, resourceId, query) {
  const path = query ? `${config.campaignsHost}${pathname}/${resourceId}?${query}` :
    `${config.campaignsHost}${pathname}/${resourceId}`;
  const res = yield fetch(path, generateOptions());
  const json = yield res.json();
  if (res.status >= 300) {
    throw handleError(json.message, res.status);
  }
  return json;
}

function* createResource(pathname, reqBody) {
  const res = yield fetch(`${config.campaignsHost}${pathname}`,
      generateOptions('POST', reqBody));
  const json = yield res.json();
  if (res.status >= 300) {
    throw handleError(json.message, res.status);
  }
  return json;
}

function* deleteResource(pathname, resourceId) {
  const res = yield fetch(`${config.campaignsHost}${pathname}/${resourceId}`,
      generateOptions('DELETE'));
  const json = yield res.json();
  if (res.status >= 300) {
    throw handleError(json.message, res.status);
  }
  return json;
}

module.exports = {
  fetchResourceList,
  fetchResourceSingle,
  createResource,
  deleteResource
};
