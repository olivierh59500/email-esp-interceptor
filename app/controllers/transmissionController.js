const handleError = require('../utils/handleError');
const transmissionService = require('../services/transmissionService');
const transmissionFormatter = require('../utils/transmissionFormatter');

function transmissionError(err) {
  return handleError('Transmission Error', err.status, [
    {
      description: 'There was a problem with your transmission request.',
      code: '400',
      message: err.message
    }
  ]);
}

function* create(req, res, next) {
  const transmission = req.body;
  try {
    const isPreview = req.query.preview === 'true';
    const sendBody = transmissionFormatter.formatForSend(transmission);
    yield transmissionService.createTransmission(sendBody, isPreview);
    res.json({
      results: {
        total_rejected_recipients: 0,
        total_accepted_recipients: transmission.recipients.length,
        id: Date.now()
      }
    });
  } catch (err) {
    next(transmissionError(err));
  }
}

module.exports = {
  create
};
