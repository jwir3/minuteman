const {ipcRenderer} = require('electron');
const { Minutes } = require('minuteman-lib');
const $ = require('jquery');
const Timer = require('./lib/timer');
const Hammer = require('hammerjs');
const Materialize = require('materialize-css');

var timer = new Timer($('#elapsed-time'));

doInitialPoll();
setupCallToOrderClickHandler();

function doInitialPoll() {
  ipcRenderer.send('poll-minutes');
  ipcRenderer.once('poll-minutes-response', (event, aMinutesJson) => {
    var minutes = Minutes.parse(aMinutesJson);
    if (minutes.agenda && minutes.agenda.title) {
      $('#meeting-title').text(minutes.agenda.title);
    }
  });
}

function setupCallToOrderClickHandler() {
  $('#floatingActionButton').click(function() {
    ipcRenderer.send('call-to-order');
    timer.start();
    var thisButton = $(this);

    // Wait for the animation to finish
    setTimeout(function() {
      thisButton.html('<i class="fa fa-gavel"></i>');
      thisButton.off('click');
      setupAdjournClickHandler();
    }, 500);
  });
}

function setupAdjournClickHandler() {
  $('#floatingActionButton').click(function() {
    ipcRenderer.send('adjourn');
    timer.stop();
    var thisButton = $(this);

    // Wait for the animation to finish
    setTimeout(function() {
      thisButton.hide();
    }, 500);
  });
}
