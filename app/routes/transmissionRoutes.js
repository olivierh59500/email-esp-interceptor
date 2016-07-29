const coExpress = require('co-express');
const express = require('express');
const transmission = require('../controllers/transmissionController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const validateTransmission = require('../middleware/validateTransmission');
const populateRecipients = require('../middleware/populateRecipients');
const router = express.Router();

module.exports = (app) => {
  router
    .use(ensureAuthenticated, validateTransmission, coExpress(populateRecipients))
    .route('/')
    .post(coExpress(transmission.create));

  app.use('/transmissions', router);
};
