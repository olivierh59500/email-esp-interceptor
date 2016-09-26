const config = require('../../config');
const fetcherF = require('./_fetcher');

const sendServiceHost = config.sendServiceHost;
const sendServiceAuth = config.sendServiceAuth;
const testSendServiceAuth = config.testSendServiceAuth;
const espHost = config.espHost;
const espAuth = config.espAuth;

const sendFetcher = fetcherF(sendServiceHost, sendServiceAuth);
const testSendFetcher = fetcherF(sendServiceHost, testSendServiceAuth);
const espFetcher = fetcherF(espHost, espAuth);

function* fetchTransmissions() {
  return yield espFetcher.fetchResourceList('/api/v1/transmissions');
}

function* createTransmission(transmissionBody, isPreview = false) {
  const fetcher = isPreview ? testSendFetcher : sendFetcher;
  return yield fetcher.createResource('/send-by-address', transmissionBody);
}

function* deleteTransmission(id) {
  return yield espFetcher.deleteResource('/api/v1/transmissions', id);
}

function* getTransmission(id) {
  return yield espFetcher.fetchResourceSingle('/api/v1/transmissions', id);
}

module.exports = {
  createTransmission,
  fetchTransmissions,
  deleteTransmission,
  getTransmission
};
