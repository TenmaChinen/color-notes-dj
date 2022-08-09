/*   S E T T E R S   */

let onCreateGroupCallback, onSelectGroupCallback, onUpdateGroupCallback, onDeleteGroupCallback;

function onCreateNoteGroup(callback) {
  onCreateGroupCallback = callback;
}

function onSelectNoteGroup(callback) {
  onSelectGroupCallback = callback;
}

function onUpdateGroup(callback) {
  onUpdateGroupCallback = callback;
}

function onDeleteGroup(callback) {
  onDeleteGroupCallback = callback;
}


/*  E V E N T S  */

function onAddGroup() {
  const groupTitle = groupInputPH.value;
  if (onCreateGroupCallback) {
    onCreateGroupCallback(groupTitle);
  }
}


function onFocusOutNoteGroup(event) {
  const groupInput = event.srcElement;
  enableNoteGroupEdit(null, groupInput, false);
  if (groupInput.lastValue !== groupInput.value) {
    if (onUpdateGroupCallback) {
      onUpdateGroupCallback(groupInput.parentElement.id, groupInput.value);
    }
  }
}
