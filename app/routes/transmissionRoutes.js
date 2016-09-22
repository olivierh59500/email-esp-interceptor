const coExpress = require('co-express');
const express = require('express');
const transmission = require('../controllers/transmissionController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const validateTransmission = require('../middleware/validateTransmission');
const populateRecipients = require('../middleware/populateRecipients');
const populateEmail = require('../middleware/populateEmail');
const router = express.Router();

module.exports = (app) => {
  router
    .use(ensureAuthenticated)
    .route('/:id')
    .delete(coExpress(transmission.deleteTransmission));
  router
    .route('/')
    .get(coExpress(transmission.list))
    .post(validateTransmission, coExpress(populateEmail), coExpress(populateRecipients),
      coExpress(transmission.create));


  app.use('/transmissions', router);
};
