const expect = require('chai').expect;
const { recipientListToSubstitution } = require('../../app/utils/listConverter');

const validRecipients = require('../fixtures/validRecipients.json');
const missingEmailSubstitution = require('../fixtures/missingEmailSubstitution.json');

describe('List Converter', () => {
  describe('recipientListToSubstitution', () => {
    const substitution = recipientListToSubstitution(validRecipients);

    it('returns a substitution item with required properties', () => {
      expect(substitution).to.contain.all.keys(['name', 'data', 'description']);
    });

    it('creates an array of recipients for the data property', () => {
      expect(substitution.data).to.be.instanceOf(Array);
    });

    it('each recipient in the data array has an email', () => {
      const recipientEmails = validRecipients.recipients.map(recip => recip.address.email);
      substitution.data.forEach(recipient => {
        expect(recipientEmails).to.contain(recipient.email);
      });
    });

    it('throws error if a recipient does not have an email', () => {
      try {
        recipientListToSubstitution(missingEmailSubstitution);
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });
});
