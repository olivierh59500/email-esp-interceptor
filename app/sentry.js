const config = require('../config');
const dsn = config.sentryDSN;

exports.init = () => {
  if (dsn) {
    const raven = require('raven');
    const client = new raven.Client(dsn, { logger: 'root' });
    client.patchGlobal();
    return client;
  }
  return { captureError: () => {} };
};
