const substitutionService = require('../services/substitutionService');
const listConverter = require('../utils/listConverter');
const handleError = require('../utils/handleError');

function* create(req, res, next) {
  const recipientList = req.body;
  try {
    const substitution = listConverter.recipientToSubstitution(recipientList);
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
};

