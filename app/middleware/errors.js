function notFound(req, res, next) {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
}

// eslint-disable-next-line
function errorMiddleware(err, req, res, next) {
  console.log(err);
  res.status(err.status || err.statusCode || 500);
  const errors = err.errors && err.errors.length ? err.errors : [{ message: err.message }];
  return res.json({ errors });
}

module.exports = {
  notFound,
  errorMiddleware
};
