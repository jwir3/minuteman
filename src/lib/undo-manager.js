const UndoableCommand = require('./undoable-command');

/**
 * A manager for {UndoableCommand}s. This is designed to be a singleton.
 */
function UndoManager() {

}

UndoManager = {
    commands: [],

    setWindow: function(aWindow) {
      UndoManager.window = aWindow;
    },

    performUndo: function() {
      if (UndoManager.commands.length > 0) {
        let command = UndoManager.commands.pop();
        UndoManager.window.webContents.send(command.getUndoEventId());
      }
    },

    pushCommand: function(command) {
      UndoManager.commands.push(command);
    }
};

module.exports = UndoManager;
