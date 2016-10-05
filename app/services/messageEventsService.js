const config = require('../../config');
const fetcherF = require('./_fetcher');

const espHost = config.espHost;
const espAuth = config.espReadAuth;

const espFetcher = fetcherF(espHost, espAuth);

function* fetchEvents(query) {
  return yield espFetcher.fetchResourceList(`/api/v1/message-events${query}`);
}

module.exports = {
  fetchEvents
};
