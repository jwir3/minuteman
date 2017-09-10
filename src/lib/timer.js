const moment = require('moment');

function Timer(element) {
  this.element = element;
  this.secondsElapsed = 0;
}

Timer.prototype = {
  start: function() {
    var self = this;
    self.timerId = setInterval(function() {
      self.secondsElapsed++;
      self.displaySeconds();
    }, 1000);
  },

  stop: function() {
    var self = this;
    clearInterval(self.timerId);
  },

  displaySeconds: function() {
    var minutes = Math.floor(this.secondsElapsed / 60);
    var seconds = this.secondsElapsed % 60;
    this.element.text(String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0"));
  },

  reset: function() {
    var self = this;
    clearInterval(self.timerId);
    self.secondsElapsed = 0;
    self.displaySeconds();
  }
};

module.exports = Timer;
