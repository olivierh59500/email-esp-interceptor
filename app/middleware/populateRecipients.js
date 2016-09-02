const find = require('lodash/find');
const listConverter = require('../utils/listConverter');
const handleError = require('../utils/handleError');
const substitutionService = require('../services/substitutionService');

function substitutionError(err) {
  return handleError('Recipients Error', 500, [
    {
      description: 'There was a problem with your transmission request.',
      code: '400',
      message: err.message
    }
  ]);
}

function filteredSubstitution(recipients, substitution) {
  return { data: recipients.map(recipient => {
    return find(substitution.data, { email: recipient.address.email });
  }) };
}

function* retrieveSubstitution(listId) {
  return yield substitutionService.fetchSubstitution(listId);
}

function convertToRecipients(substitution) {
  const recipientsList = listConverter.substitutionToRecipientList(substitution, true);
  return recipientsList.results.recipients;
}

module.exports = function* populateRecipients(req, res, next) {
  try {
    if (req.query.mixed === 'true') {
      req.body.recipients = convertToRecipients(filteredSubstitution(
        req.body.recipients, (yield retrieveSubstitution(req.body.substitutionId))));
    } else if (req.body.recipients.list_id) {
      req.body.substitutionId = req.body.recipients.list_id;
      req.body.recipients = convertToRecipients((yield retrieveSubstitution(req.body.substitutionId)));
    }
    next();
  } catch (err) {
    next(substitutionError(err));
  }
};
