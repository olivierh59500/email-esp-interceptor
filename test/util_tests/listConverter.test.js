const expect = require('chai').expect;
const { recipientListToSubstitution } = require('../../app/utils/listConverter');

const validSubstitution = require('../fixtures/validSubstitution.json');

describe('List Converter', () => {
  describe('recipientListToSubstitution', () => {
    it('returns a substitution item with required properties', () => {
      const substitution = recipientListToSubstitution(validSubstitution);
      expect(substitution).to.contain.all.keys(['name', 'data', 'description']);
    });
  });
});
