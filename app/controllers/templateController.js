const templateService = require('../services/templateService');
const handleError = require('../utils/handleError');

function templateError(err) {
  return handleError(err.message, err.status, err.errors);
}

function* list(req, res, next) {
  let emailTemplates;
  try {
    emailTemplates = yield templateService.fetchTemplates();
  } catch (err) {
    return next(templateError(err));
  }

  return res.json({
    results: emailTemplates.map(template => ({
      id: template._id,
      name: template.name,
      published: true
    }))
  });
}

module.exports = {
  list
};
