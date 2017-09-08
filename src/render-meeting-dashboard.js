const {ipcRenderer} = require('electron');
const { Minutes } = require('minuteman-lib');
const $ = require('jquery');
const Timer = require('./lib/timer');

var timer = new Timer($('#elapsed-time'));

doInitialPoll();

$('#callToOrder').click(function() {
  timer.start();
  $('#callToOrder').hide();
  ipcRenderer.send('call-to-order');
});

function doInitialPoll() {
  ipcRenderer.send('poll-minutes');
  ipcRenderer.once('poll-minutes-response', (event, aMinutesJson) => {
    console.log(aMinutesJson);
    var minutes = Minutes.parse(aMinutesJson);
    console.log(minutes.agenda.title);
    if (minutes.agenda && minutes.agenda.title) {
      $('#meeting-title').text(minutes.agenda.title);
    }
  });
}
