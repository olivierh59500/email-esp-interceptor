const config = require('../../config');
const auth = new Buffer(`${config.campaignsUsername}:${config.campaignsPassword}`);
const basicAuth = `Basic ${auth.toString('base64')}`;
const fetcher = require('./_fetcher')(config.campaignsHost, basicAuth);

function* fetchSubstitutions(query, res) {
  return yield fetcher.fetchResourceList('/substitutions', res, query);
}

function* fetchSubstitution(substitutionId) {
  return yield fetcher.fetchResourceSingle('/substitutions', substitutionId);
}

function* createSubstitution(substitutionBody) {
  return yield fetcher.createResource('/substitutions', substitutionBody);
}

function* deleteSubstitution(substitutionId) {
  return yield fetcher.deleteResource('/substitutions', substitutionId);
}

module.exports = {
  fetchSubstitutions,
  fetchSubstitution,
  createSubstitution,
  deleteSubstitution
};
