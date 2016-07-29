const bAuth = require('basic-auth');
const config = require('../../config');
const handleError = require('../utils/handleError');

function authError(message) {
  return handleError('Authentication Error', 401, [
    {
      description: 'There was a problem authenticating your request.',
      code: '401',
      message
    }
  ]);
}

function basicAuth(req, res, next) {
  const credentials = bAuth(req);

  if (!credentials || credentials.name !== config.authUser ||
    credentials.pass !== config.authPassword) {
    return next(authError('Invalid username or password'));
  }
  return next();
}

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(authError('Please make sure your request has an Authorization header'));
  }

  const method = req.headers.authorization.split(' ')[0];

  if (method === 'Basic') {
    return basicAuth(req, res, next);
  }
  return next(authError('Authentication method not supported'));
};
