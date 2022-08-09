
/*   N O T E   R E Q U E S T S   */

function createNoteRequest(groupId, noteData, callback) {
  const groupDataBaseId = getDataBaseId(groupId);
  sendNotePostRequest(noteData, callback, `/notes/create/${groupDataBaseId}/`);
}

const name2Code = { all: 0, title: 1, text: 2, color: 3 };

function updateNoteRequest(groupId, noteId, elementName) {
  const elementCode = name2Code[elementName];
  noteData = getNoteData(noteId, false, elementCode);
  const groupDataBaseId = getDataBaseId(groupId);
  const noteDataBaseId = getDataBaseId(noteId);
  sendNotePostRequest(
    noteData, null, `/notes/update/${groupDataBaseId}/${noteDataBaseId}/${elementCode}/`);
}

function deleteNoteRequest(groupId, noteId, callback) {
  const groupDataBaseId = getDataBaseId(groupId);
  const noteDataBaseId = getDataBaseId(noteId);
  sendNotePostRequest(null, callback, `/notes/delete/${groupDataBaseId}/${noteDataBaseId}/`);
}

/*   G R O U P   R E Q U E S T S   */

function createGroupRequest(groupTitle, callback) {
  sendNotePostRequest(groupTitle, callback, `/groups/create/`);
}

function readGroupRequest(groupId, callback) {
  const groupDataBaseId = getDataBaseId(groupId);
  sendNotePostRequest(null, callback, `/groups/read/${groupDataBaseId}/`);
}

function updateGroupRequest(groupId, title, callback) {
  const groupDataBaseId = getDataBaseId(groupId);
  sendNotePostRequest(title, callback, `/groups/update/${groupDataBaseId}/`);
}

function deleteGroupRequest(groupId, callback) {
  const groupDataBaseId = getDataBaseId(groupId);
  sendNotePostRequest(null, callback, `/groups/delete/${groupDataBaseId}/`);
}

/*   P O S T   R E Q U E S T   */

function sendNotePostRequest(data, callback, url) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  if (callback != null) {
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        callback(JSON.parse(xhttp.responseText));
      }
    };
  }
  xhttp.setRequestHeader("X-CSRFToken", csrftoken);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

/*   U T I L S   */

function getNoteData(noteId, storeId = true, elementCode = 0) {
  const note = document.getElementById(noteId);
  const noteData = storeId ? { "id": noteId } : {};

  if (elementCode == 1 || elementCode == 0) {
    noteData["title"] = note.querySelector(".title").value
  }
  if (elementCode == 2 || elementCode == 0) {
    noteData["text"] = note.querySelector(".textarea").textContent;
  }

  if (elementCode == 3 || elementCode == 0) {
    noteData["color_id"] = note.querySelector(".dropdown").getAttribute("currColorId");
  }

  return noteData;
}


function getDataBaseId(noteId) {
  return noteId.split('-')[1];
}