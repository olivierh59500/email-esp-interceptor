const fetcher = require('./_fetcher');

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
