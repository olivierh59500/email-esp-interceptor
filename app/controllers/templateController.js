// const templatesService = require('../services/templateService');

function* list(req, res) {
  res.json({ results: [] });
}

function* get(req, res) {
  res.json({
    results: {
      id: req.params.templateId,
      name: 'test'
    }
  });
}

module.exports = {
  list,
  get
};
