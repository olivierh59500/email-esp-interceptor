const expect = require('chai').expect;
const { formatForSend } = require('../../app/utils/transmissionFormatter');

const validTransmission = require('../fixtures/validTransmission');

describe('Transmission Formatter', () => {
  describe('formatForSend', () => {
    const sendBody = formatForSend(validTransmission);

    it('returns a sendBody item with required properties', () => {
      expect(sendBody).to.contain.all.keys(
        ['transmissionHeader', 'to', 'from', 'subject', 'htmlContent', 'plainTextContent']
      );
    });

    it('has the correct "from" deep properties', () => {
      expect(sendBody).to.have.deep.property('from.address', validTransmission.content.from.email);
      expect(sendBody).to.have.deep.property('from.name', validTransmission.content.from.name);
    });

    it('has correct globalSubstitutionData', () => {
      expect(sendBody).to.have.deep.property('transmissionHeader.globalSubstitutionData',
        validTransmission.substitution_data);
    });

    it('has correct metadata', () => {
      expect(sendBody).to.have.deep.property('transmissionHeader.metadata',
        validTransmission.metadata);
    });

    it('has correct subject', () => {
      expect(sendBody).to.have.property('subject', validTransmission.content.subject);
    });

    it('has correct htmlContent and plainTextContent', () => {
      expect(sendBody).to.have.property('htmlContent', validTransmission.content.html);
      expect(sendBody).to.have.property('plainTextContent', validTransmission.content.text);
    });

    it('creates an array of recipients for the to.address property', () => {
      expect(sendBody).to.have.deep.property('to.address').to.be.instanceOf(Array);
    });

    it('each recipient has email in the to.address array', () => {
      const recipientEmails = validTransmission.recipients.map(recip => recip.address.email);
      sendBody.to.address.forEach(recipient => {
        expect(recipientEmails).to.contain(recipient);
      });
    });

    it('each recipient substitution_data is contained in userSubstitutionData', () => {
      const substitutionData = validTransmission.recipients.map(recip => {
        return Object.assign({}, { email: recip.address.email }, recip.substitution_data);
      });
      sendBody.transmissionHeader.userSubstitutionData.forEach(recipient => {
        expect(substitutionData).to.contain(recipient);
      });
    });
  });
});
