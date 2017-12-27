const {ipcRenderer} = require('electron');
const { Minutes } = require('tricorne');
const $ = require('jquery');
const Timer = require('./lib/timer');
const Hammer = require('hammerjs');
const Materialize = require('materialize-css');

var timer = new Timer($('#elapsed-time'));

doInitialPoll();
resetCallToOrderButton();
setupUndoHandlers();

function doInitialPoll() {
  ipcRenderer.send('poll-minutes');
  ipcRenderer.once('poll-minutes-response', (event, aMinutesJson) => {
    var minutes = Minutes.parse(aMinutesJson);
    if (minutes.agenda && minutes.agenda.title) {
      $('#meeting-title').text(minutes.agenda.title);
    }
  });
}

function resetCallToOrderButton() {
  $('#floatingActionButton').html('<i class="fa fa-bullhorn"></i>');
  $('#floatingActionButton').off('click');
  $('#floatingActionButton').show();

  $('#floatingActionButton').click(function() {
    ipcRenderer.send('call-to-order');
    timer.start();
    var thisButton = $(this);

    // Wait for the animation to finish
    setTimeout(function() {
      resetAdjournButton();
    }, 500);
  });
}

function resetAdjournButton() {
  $('#floatingActionButton').html('<i class="fa fa-gavel"></i>');
  $('#floatingActionButton').off('click');
  $('#floatingActionButton').show();

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

function setupUndoHandlers() {
  ipcRenderer.on('undo-call-to-order', () => {
    timer.reset();
    resetCallToOrderButton();
    ipcRenderer.send('undo-call-to-order');
  });

  ipcRenderer.on('undo-adjourn', () => {
    ipcRenderer.send('undo-adjourn');
    timer.start();
    resetAdjournButton();
  });
}
