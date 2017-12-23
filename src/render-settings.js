// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
const $ = require('jquery');

const pageName = 'Settings';

$(document).ready(function() {
  loadPageName();
  setupHandlers();
});

function loadPageName() {
  $('#navTitle').text(pageName);
}

function setupHandlers() {
  $('#navigateBack').click(() => {
    ipcRenderer.send('navigate-back');
  });
}
