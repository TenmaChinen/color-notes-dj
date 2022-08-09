/*   S E T T E R S   */

let onNoteCreateCallback, onNoteUpdateCallback, onNoteDeleteCallback;


function onCreateNote(callback) {
  onNoteCreateCallback = callback;
}

function onUpdateNote(callback) {
  onNoteUpdateCallback = callback;
}

function onDeleteNote(callback) {
  onNoteDeleteCallback = callback;
}

/*  E V E N T S  */

const timers = {};

function delayTrigger(event, noteId) {
  // Prevent Esc Key perform modifications.
  if (event.keyCode != 27) {
    const elementName = event.srcElement.getAttribute("name");
    const timerId = noteId + elementName;
    clearTimeout(timers[timerId]);
    timers[timerId] = setTimeout(timerTimeOut, 1000, noteId, elementName);
  }
}

function timerTimeOut(noteId, elementName) {
  delete timers[noteId + elementName];
  if (onNoteUpdateCallback) {
    onNoteUpdateCallback(getNoteGroupId(), noteId, elementName);
  }
}

function onColorSelected(colorId, noteId) {
  setNoteColor(noteId, colorId);
  if (noteId != "note-ph") {
    if (onNoteUpdateCallback) {
      onNoteUpdateCallback(getNoteGroupId(), noteId, "color");
    }
  }
}


function onClickDeleteNote(noteId) {
  if (onNoteDeleteCallback) {
    onNoteDeleteCallback(getNoteGroupId(), noteId);
  }
}


function addNewNote() {
  const noteData = getNoteData("note-ph", false);
  if (onNoteCreateCallback) {
    onNoteCreateCallback(getNoteGroupId(), noteData);
  }
}