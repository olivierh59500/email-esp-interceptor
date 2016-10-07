const handleError = require('../utils/handleError');

module.exports = (req, res, next) => {
  console.log(req.body);
  req.checkBody('recipients').notEmpty();
  req.checkBody('recipients.list_id').optional().notEmpty();
  req.checkBody('content.template_id').notEmpty();
  const errors = req.validationErrors();
  return errors ? next(handleError('Validation Error', 400, errors)) : next();
};
