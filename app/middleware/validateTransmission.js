const handleError = require('../utils/handleError');

module.exports = (req, res, next) => {
  req.checkBody('recipients').notEmpty();
  req.checkBody('recipients.list_id').optional().notEmpty();
  req.checkBody('content.template_id').notEmpty();
  req.checkBody('content.from').notEmpty();
  req.checkBody('content.from.email').optional().isEmail();
  req.checkBody('content.subject').notEmpty();
  const errors = req.validationErrors();
  return errors ? next(handleError('Validation Error', 400, errors)) : next();
};
