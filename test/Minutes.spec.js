import { should } from 'chai';
import Minutes from '../src/Minutes';
import moment from 'moment';
import fixtures from './FixtureHelper';

should();

describe('Minutes', () => {
  describe('basic constructor', () => {
    it('should construct an object of type Minutes', () => {
      var minutes = new Minutes();
      minutes.should.exist;
    });
  });

  describe('constructor with a scheduled start time', () => {
    it('should construct an object of type Minutes with a scheduled start time', () => {
      var now = moment();
      var minutes = new Minutes(now);
      minutes.should.exist;

      minutes.scheduledStartTime.should.equal(now);
      minutes.scheduledStartTimeAsString.should.equal(now.format('MMMM DD, YYYY hh:mma'));
    });
  });
});
