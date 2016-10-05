const handleError = require('../utils/handleError');
const messageEventsService = require('../services/messageEventsService');
const url = require('url');

function messageEventsError(err) {
  return handleError(err.message, err.status, err.errors);
}

function* list(req, res, next) {
  const query = url.parse(req.originalUrl).search || '';
  let messageEvents;
  try {
    messageEvents = yield messageEventsService.fetchEvents(query);
  } catch (err) {
    return next(messageEventsError(err));
  }

  return res.json(messageEvents);
}

module.exports = {
  list
};
