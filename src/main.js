const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const url = require('url')
const $ = require('jquery');
const { Agenda, Minutes } = require('minuteman-lib');
const fs = require('fs');
const UndoableCommand = require('./lib/undoable-command');
const UndoManager = require('./lib/undo-manager');

const HtmlDir = path.join(__dirname, '..', 'html');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let minutes = null;
let pages = [];

// These are the possible commands that can be executed by the application.
var commands = [
    new UndoableCommand('call-to-order',
                        'undo-call-to-order',
                        () => {
                          minutes.callToOrder();
                        },
                        () => {
                          minutes.calledToOrderTime = null;
                        }),
    new UndoableCommand('adjourn',
                        'undo-adjourn',
                        () => {
                          minutes.adjourn();
                        },
                        () => {
                          minutes.adjournedTime = null;
                        })
];

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow(
    {
      width: 800,
      height: 600,
      title: app.getName()
    });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(HtmlDir, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  require('./menu/mainmenu');

  // We need to set the window in the UndoManager because it needs to
  // communicate with the renderer process.
  UndoManager.setWindow(win);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('create-new-minutes', () => {
  minutes = new Minutes(new Date());
  win.webContents.send('minutes-loaded');
});

ipcMain.on('navigate-back', () => {
  let nextPage = pages.pop();
  win.loadURL(url.format({
    pathname: path.join(HtmlDir, nextPage + '.html'),
    protocol: 'file:',
    slashes: true
  }))
});

ipcMain.on('push-page', (event, aPage) => {
  pages.push(aPage);
});

ipcMain.on('open-file', () => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      {
        name: 'Minuteman JSON Files',
        extensions: ['json', 'js']
      }
    ]
  }, (filePaths) => {
    if (!filePaths) {
      // The user canceled the operation.
      return;
    }

    // There should be only one file path selected.
    if (filePaths.length > 1) {
      throw ('Only one agenda can be selected at a time');
    }

    var fileData = fs.readFileSync(filePaths[0], 'utf-8');
    minutes = new Minutes(new Agenda(JSON.parse(fileData)));
    win.webContents.send('minutes-loaded');
  });
});

ipcMain.on('load-local-html', (event, arg) => {
  win.loadURL(url.format({
    pathname: path.join(HtmlDir, arg),
    protocol: 'file:',
    slashes: true
  }))
});

ipcMain.on('poll-minutes', (event, arg) => {
  win.webContents.send('poll-minutes-response', JSON.stringify(minutes));
});

// Allow for all commands to be processed
for (let i in commands) {
  let nextCommand = commands[i];
  ipcMain.on(nextCommand.getEventId(), () => {
    UndoManager.pushCommand(nextCommand);
    nextCommand.performAction();
  });

  ipcMain.on(nextCommand.getUndoEventId(), () => {
    nextCommand.undo();
  });
}
