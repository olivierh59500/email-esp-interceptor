// const templatesService = require('../services/templateService');

function* list(req, res) {
  res.json({ results: [] });
}

module.exports = {
  list
};
