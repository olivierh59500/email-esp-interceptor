const app = require('../app/server');
const request = require('supertest')(app);

['get', 'post', 'patch', 'delete'].map(method => (
  exports[method] = (url) => request[method](url)
));

