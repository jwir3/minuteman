var should = require('chai').should();
var Minutes = require('../src/Minutes');

describe('Minutes', function() {
  describe('Basic Construction', function() {
    it('should construct an object of type Minutes', function() {
      var minutes = new Minutes();
      minutes.should.exist;
    });
  });
});
