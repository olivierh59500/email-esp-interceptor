const config = require('../../config');
const fetcher = require('./_fetcher')(config.sendServiceHost, config.sendServiceAuth);

function* createTransmission(transmissionBody) {
  return yield fetcher.createResource('/send-by-address', transmissionBody);
}

module.exports = {
  createTransmission
};
