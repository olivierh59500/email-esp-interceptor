const emailService = require('../services/emailService');
const handleError = require('../utils/handleError');

function emailError(err) {
  return handleError('Template Error', 500, [
    {
      description: 'There was a problem with your transmission request.',
      code: '400',
      message: err.message
    }
  ]);
}

module.exports = function* populateEmail(req, res, next) {
  try {
    const email = yield emailService.fetchEmail(req.body.content.template_id);
    req.body.content.html = email.htmlBody;
    req.body.content.text = email.plainBody;
    req.body.content.subject = email.subject;
    req.body.content.from = { email: email.from.address, name: email.from.name };
    next();
  } catch (err) {
    next(emailError(err));
  }
};
