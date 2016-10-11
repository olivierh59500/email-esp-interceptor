const coExpress = require('co-express');
const express = require('express');
const recipientList = require('../controllers/recipientListController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

module.exports = (app) => {
  router
    .use(ensureAuthenticated)
    .route('/')
    .get(coExpress(recipientList.list))
    .post(coExpress(recipientList.create));
  router
    .route('/:recipientListId')
    .get(coExpress(recipientList.read));

  app.use('(/api/v1)?/recipient-lists', router);
};
