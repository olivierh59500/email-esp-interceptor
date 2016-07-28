const co = require('co');
const nock = require('nock');
const expect = require('chai').expect;
const transmissionService = require('../../app/services/transmissionService');
const config = require('../../config');

const validTransmission = require('../fixtures/validTransmission');

function setNockPost(path) {
  return nock(config.sendServiceHost)
    .post(path);
}

describe('Transmission Service', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  after(() => {
    nock.cleanAll();
  });

  describe('createTransmission', () => {
    it('returns the transmission jobId if successful', done => {
      const sendRes = { jobId: '123' };
      setNockPost('/send-by-address').reply(200, sendRes);
      co(function* () {
        const transmission = yield transmissionService.createTransmission(validTransmission);
        expect(transmission.jobId).to.eql(sendRes.jobId);
        done();
      }).catch(done);
    });

    it('returns an error if could not create transmission', done => {
      setNockPost('/send-by-address').reply(400, { message: 'Bad Request' });
      co(function* () {
        try {
          yield transmissionService.createTransmission(validTransmission);
        } catch (err) {
          expect(err.message).to.exist;
          expect(err.status).to.eql(400);
          done();
        }
      }).catch(done);
    });
  });
});
