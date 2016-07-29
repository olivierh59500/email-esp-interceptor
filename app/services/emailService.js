const config = require('../../config');
const auth = new Buffer(`${config.campaignsUsername}:${config.campaignsPassword}`);
const basicAuth = `Basic ${auth.toString('base64')}`;
const fetcher = require('./_fetcher')(config.campaignsHost, basicAuth);

function* fetchEmail(emailId) {
  return yield fetcher.fetchResourceSingle('/emails', emailId);
}

module.exports = {
  fetchEmail
};
