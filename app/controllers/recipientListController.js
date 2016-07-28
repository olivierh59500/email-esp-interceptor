const substitutionService = require('../services/substitutionService');
const listConverter = require('../utils/listConverter');
const handleError = require('../utils/handleError');

function* read(req, res, next) {
  const recipientListId = req.params.recipientListId;
  const showRecipients = !(req.query.show_recipients === 'false');
  try {
    const substitution = yield substitutionService.fetchSubstitution(recipientListId);
    const recipientList = listConverter.substitutionToRecipientList(substitution, showRecipients);
    res.json(recipientList);
  } catch (err) {
    next(handleError(err.message, err.status));
  }
}

function* create(req, res, next) {
  const recipientList = req.body;
  try {
    const substitution = listConverter.recipientListToSubstitution(recipientList);
    const substitutionRes = yield substitutionService.createSubstitution(substitution);
    // res missing properties total_rejected_recipients
    // & total_accepted_recipients
    res.json({ results: { id: substitutionRes._id, name: substitutionRes.name } });
  } catch (err) {
    next(handleError(err.message, err.status));
  }
}

module.exports = {
  create,
  read
};
