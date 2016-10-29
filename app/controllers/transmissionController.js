const handleError = require('../utils/handleError');
const transmissionService = require('../services/transmissionService');
const transmissionFormatter = require('../utils/transmissionFormatter');

function transmissionError(err) {
  return handleError(err.message, err.status, err.errors);
}

function* list(req, res, next) {
  let transmissions;
  try {
    transmissions = yield transmissionService.fetchTransmissions();
  } catch (err) {
    return next(transmissionError(err));
  }

  if (req.query.state) {
    transmissions.results = transmissions.results.filter(trans => {
      return trans.state.toLowerCase() === req.query.state.toLowerCase();
    });
  }
  return res.json(transmissions);
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
        id: sendBody.transmissionHeader.description
      }
    });
  } catch (err) {
    next(transmissionError(err));
  }
}

function* get(req, res, next) {
  let getResponse;
  try {
    getResponse = yield transmissionService.getTransmission(req.params.id);
  } catch (err) {
    return next(transmissionError(err));
  }
  return res.json(getResponse);
}

function* deleteTransmission(req, res, next) {
  let delResponse;
  try {
    delResponse = yield transmissionService.deleteTransmission(req.params.id);
  } catch (err) {
    return next(transmissionError(err));
  }
  return res.json(delResponse);
}

module.exports = {
  create,
  list,
  deleteTransmission,
  get
};
