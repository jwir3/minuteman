import { should } from 'chai';
should();

import Minutes from '../src/Minutes';

describe('Minutes', () => {
  describe('Basic Construction', () => {
    it('should construct an object of type Minutes', () => {
      var minutes = new Minutes();
      minutes.should.exist;
    });
  });
});
