const config = require('../../config');
const fetcherF = require('./_fetcher');
const sendServiceHost = config.sendServiceHost;
const sendServiceAuth = config.sendServiceAuth;
const testSendServiceAuth = config.testSendServiceAuth;

function* createTransmission(transmissionBody, isPreview = false) {
  const auth = isPreview ? testSendServiceAuth : sendServiceAuth;
  const fetcher = fetcherF(sendServiceHost, auth);
  return yield fetcher.createResource('/send-by-address', transmissionBody);
}

module.exports = {
  createTransmission
};
