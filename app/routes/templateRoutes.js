const coExpress = require('co-express');
const express = require('express');
const templates = require('../controllers/templateController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

module.exports = (app) => {
  router
    .use(ensureAuthenticated)
    .route('/:templateId')
    .get(coExpress(templates.get));
  router
    .route('/')
    .get(coExpress(templates.list));

  app.use('(/api/v1)?/templates', router);
};
