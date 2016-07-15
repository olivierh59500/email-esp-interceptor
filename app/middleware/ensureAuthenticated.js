const bAuth = require('basic-auth');
const config = require('../../config');
const handleError = require('../utils/handleError');

function basicAuth(req, res, next) {
  const credentials = bAuth(req);

  if (!credentials || credentials.name !== config.authUser ||
    credentials.pass !== config.authPassword) {
    return next(handleError('Invalid username or password', 401));
  }
  return next();
}

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(handleError('Please make sure your request has an Authorization header', 401));
  }

  const method = req.headers.authorization.split(' ')[0];

  if (method === 'Basic') {
    return basicAuth(req, res, next);
  }
  return next(handleError('Authentication method not supported', 401));
};

