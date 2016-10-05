const coExpress = require('co-express');
const express = require('express');
const messageEvents = require('../controllers/messageEventsController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

module.exports = (app) => {
  router
    .use(ensureAuthenticated)
    .route('/')
    .get(coExpress(messageEvents.list));

  app.use('(/api/v1)?/message-events', router);
};
