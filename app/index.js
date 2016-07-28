const Express = require('express');
const bodyParser = require('body-parser');
const { notFound, errorMiddleware } = require('./middleware/errors');

const app = new Express();

// common middleware
app.use(bodyParser.json());

require('./routes/recipientListRoutes')(app);
require('./routes/transmissionRoutes')(app);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;
