const find = require('lodash/find');
const substitutionService = require('../services/substitutionService');
const transmissionService = require('../services/transmissionService');
const transmissionFormatter = require('../utils/transmissionFormatter');
const listConverter = require('../utils/listConverter');

function* pickRecipients(reqBody) {
  const substitutionId = reqBody.substitutionId;
  const substitutionRes = yield substitutionService.fetchSubstitution(substitutionId);
  const filteredRecipients = { data: reqBody.recipients.map(recipient => {
    return find(substitutionRes.data, { email: recipient.address.email });
  }) };
  const recipientList = listConverter.substitutionToRecipientList(filteredRecipients, true);
  return recipientList.results.recipients;
}

function* create(req, res) {
  const transmission = req.body;
  const substitutionId = transmission.recipients.list_id;
  if (req.query.mixed === 'true') {
    transmission.recipients = yield pickRecipients(req.body);
  }
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
    res.status(400).json({
      errors: [
        {
          description: 'There was a problem with your transmission request.',
          code: '400',
          message: err.message
        }
      ]
    });
  }
}

module.exports = {
  create
};
