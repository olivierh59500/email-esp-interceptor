const fetch = require('node-fetch');
const handleError = require('../utils/handleError');

module.exports = (host, auth) => {
  function generateOptions(method = 'GET', body) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: auth
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
    const response = yield fetch(host + path, generateOptions());
    copyHeaders(res, response);
    const json = yield response.json();
    if (response.status >= 300) {
      throw handleError(json.message, response.status);
    }
    return json;
  }

  function* fetchResourceSingle(pathname, resourceId, query) {
    const path = query ? `${host}${pathname}/${resourceId}?${query}` :
      `${host}${pathname}/${resourceId}`;
    const res = yield fetch(path, generateOptions());
    const json = yield res.json();
    if (res.status >= 300) {
      throw handleError(json.message, res.status);
    }
    return json;
  }

  function* createResource(pathname, reqBody) {
    const res = yield fetch(`${host}${pathname}`,
      generateOptions('POST', reqBody));
    const json = yield res.json();
    if (res.status >= 300) {
      throw handleError(json.message, res.status, json.errors);
    }
    return json;
  }

  function* patchResource(pathname, resourceId, reqBody) {
    const res = yield fetch(`${host}${pathname}/${resourceId}`,
      generateOptions('PATCH', reqBody));
    const json = yield res.json();
    if (res.status >= 300) {
      throw handleError(json.message, res.status);
    }
    return json;
  }

  function* deleteResource(pathname, resourceId) {
    const res = yield fetch(`${host}${pathname}/${resourceId}`,
      generateOptions('DELETE'));
    const json = yield res.json();
    if (res.status >= 300) {
      throw handleError(json.message, res.status, json.errors);
    }
    return json;
  }

  return {
    fetchResourceList,
    fetchResourceSingle,
    createResource,
    patchResource,
    deleteResource
  };
};
