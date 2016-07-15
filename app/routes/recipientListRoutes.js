const coExpress = require('co-express');
const express = require('express');
const recipientList = require('../controllers/recipientListController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

module.exports = (app) => {
  router
    //.use(ensureAuthenticated)
    .route('/')
    //.get(coExpress(recipientList.list))
    .post(coExpress(recipientList.create));
  //router
    //.route('/:recipientListId')
    //.get(coExpress(recipientList.read))
    //.delete(coExpress(recipientList.deleterecipientList));

  //router.param('recipientListId', coExpress(recipientList.recipientListById));
  app.use('/recipient-lists', router);
};
