const {Menu} = require('electron');
const electron = require('electron');
const UndoManager = require('../lib/undo-manager');
const app = electron.app;

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click (item, focusedWindow) {
          UndoManager.performUndo();
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  console.log("APP NAME: " + app.getName());
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
