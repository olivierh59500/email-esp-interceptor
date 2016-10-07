// const templatesService = require('../services/templateService');

function* list(req, res) {
  res.json({ results: [
    {
      id: '57da6024932d0503002eb369',
      name: '57da6024932d0503002eb369',
      description: 'test',
      published: true
    }
  ] });
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
