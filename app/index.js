const Express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const { notFound, errorMiddleware } = require('./middleware/errors');

const app = new Express();

// common middleware
app.use(bodyParser.json());
app.use(validator());

require('./routes/messageEventsRoutes')(app);
require('./routes/recipientListRoutes')(app);
require('./routes/transmissionRoutes')(app);
require('./routes/templateRoutes')(app);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;
