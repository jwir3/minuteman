// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
const $ = require('jquery');
const path = require('path');

const pageName = 'index';

const HtmlDir = path.join(__dirname, '..', 'html');

setupHandlers();

let minutes = null;

ipcRenderer.on('minutes-loaded', () => {
  displayMeetingDashboard();
});

function setupHandlers() {
  $('#openSettings').click(function() {
    ipcRenderer.send('push-page', pageName);
    // let settingsHtmlPath = path.join(HtmlDir, 'settings.html');
    // console.log(`About to load ${settingsHtmlPath}`)
    // ipcRenderer.send('load-relative-url', settingsHtmlPath);
    ipcRenderer.send('load-local-html', 'settings.html');
  });

  $('#newMeeting').click(function() {
    ipcRenderer.send('create-new-minutes');
  });

  $('#openAgenda').click(function() {
    ipcRenderer.send('open-file');
  });
}

function displayMeetingDashboard() {
  ipcRenderer.send('load-relative-url', 'html/meeting-dashboard.html');
}
