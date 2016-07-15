require('dotenv').load({ silent: true });

const config = require('../config');
const logger = require('./logger');

const app = require('./index');

app.listen(config.port, () => {
  logger.info('App is listening on port', config.port);
});

module.exports = app;
