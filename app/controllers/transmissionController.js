const substitutionService = require('../services/substitutionService');
const transmissionService = require('../services/transmissionService');
const transmissionFormatter = require('../utils/transmissionFormatter');
const listConverter = require('../utils/listConverter');
const handleError = require('../utils/handleError');

function* create(req, res, next) {
  const transmission = req.body;
  const substitutionId = transmission.recipients.list_id;
  try {
    if (substitutionId) {
      const substitutionRes = yield substitutionService.fetchSubstitution(substitutionId);
      const recipientsList = listConverter.substitutionToRecipientList(substitutionRes, true);
      transmission.recipients = recipientsList.results.recipients;
    }
    const sendBody = transmissionFormatter.formatForSend(transmission);
    yield transmissionService.createTransmission(sendBody);
    res.json({
      results: {
        total_rejected_recipients: 0,
        total_accepted_recipients: transmission.recipients.length,
        id: Date.now()
      }
    });
  } catch (err) {
    next(handleError(err.message, err.status));
  }
}

module.exports = {
  create
};
