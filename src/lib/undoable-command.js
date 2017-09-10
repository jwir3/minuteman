/**
 * A command that has been executed within Minuteman that can be undone.
 *
 * @param eventId {String} An id for the initial command's event
 * @param undoEventId {String} An id for the command's undo event
 * @param actionFunc {Function} The action to perform when the command is
 *        executed.
 * @param undoActionFunc {Function} The action to perform when the command is
 *        undone.
 */
function UndoableCommand(eventId, undoEventId, actionFunc, undoActionFunc) {
  this.eventId = eventId;
  this.undoEventId = undoEventId;
  this.performAction = actionFunc;
  this.undo = undoActionFunc;
}

UndoableCommand.prototype = {
  getEventId: function() {
    return this.eventId;
  },

  getUndoEventId: function() {
    return this.undoEventId;
  },

  equals: function(aOther) {
    if (!(aOther instanceof UndoableCommand)) {
      return false;
    }

    return aOther.getEventId() === this.getEventId()
           && aOther.getUndoEventId() === this.getUndoEventId();
  }
};

module.exports = UndoableCommand;
