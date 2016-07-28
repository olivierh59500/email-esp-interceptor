const coExpress = require('co-express');
const express = require('express');
const transmission = require('../controllers/transmissionController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

module.exports = (app) => {
  router
    .use(ensureAuthenticated)
    .route('/')
    .post(coExpress(transmission.create));

  app.use('/transmissions', router);
};
