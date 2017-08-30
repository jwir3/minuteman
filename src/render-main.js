// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
const $ = require('jquery');

setupHandlers();

let minutes = null;

function setupHandlers() {
  $('#newMeeting').click(function() {
    ipcRenderer.send('create-new-minutes');
    displayMeetingDashboard();
  });
}

function displayMeetingDashboard() {
  ipcRenderer.send('load-relative-url', 'html/meeting-dashboard.html');
}
