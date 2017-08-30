const {ipcRenderer} = require('electron');
const $ = require('jquery');
const Timer = require('./lib/timer');

var timer = new Timer($('#elapsed-time'));

$('#callToOrder').click(function() {
  timer.start();
  $('#callToOrder').hide();
  ipcRenderer.send('call-to-order');
});
