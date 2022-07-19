
let timer = 0

function delayTrigger(noteId){
  clearTimeout(timer);
  timer = setTimeout(saveNote,1000,noteId);
}

function saveNote(noteId){
  noteData = getNoteData(noteId);
  noteData["id"] = noteId;
  sendNotePostRequest({"note":noteData,"action":1},null);
}

function openNoteCreator(){
  const newNote = document.getElementById("new-note");
  // textBox = newNote.querySelector(".input");
  // textarea = formCreator.querySelector("span");

  // if ( textBox.style["display"] == "none"){
  //   textBox.style["display"] = "block";
  //   textarea.focus();
  // }
}

function getNoteData(noteId){
  const note = document.getElementById(noteId);
  const noteInputs = note.querySelectorAll(".input");
  const noteData = {};

  noteInputs.forEach(function(input){
    let name = input.getAttribute("name");
    if (input.tagName == "INPUT" ){
      noteData[name] = input.value;
    }else{
      noteData[name] = input.textContent;
    }
  });
  return noteData;
}

function sendNotePostRequest(data,callback){
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", currentUrl, true);
  if ( callback != null ){
    xhttp.onreadystatechange = function()
    {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            callback(JSON.parse(xhttp.responseText));
        }
    };
  }
  xhttp.setRequestHeader("X-CSRFToken",csrftoken );
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function saveNewNote(){
  noteData = getNoteData("new-note");
  sendNotePostRequest(
    {"note":noteData,"action":0},
    function(jsonResponse){
      noteData["id"] = jsonResponse["id"];
      createNote(noteData);
    });
}

function createNote(noteData){
  notesContainer = document.getElementById("notes-container")
  firstNote = notesContainer.children[1];
  newNote = getNewNoteElement(noteData);
  notesContainer.insertBefore(newNote,firstNote);
}


function getNewNoteElement(noteData){
  note = document.createElement("div");
  note.classList.add("card");
  note.id = noteData.id;
  note.innerHTML = `
    <input class="input" name = "title" placeholder="Title" value = "${noteData.title}" maxlength="100" autocomplete="off" onkeyup="delayTrigger('${noteData.id}')"></input>
    <div class="text-box">
      <div class="scroll-box">
        <span class="input textarea" type="text" name="text" role="textbox" contenteditable placeholder="Text" onkeyup="delayTrigger('${noteData.id}')">${noteData.text}</span>
      </div>
    </div>
    <i class="material-icons btn-close" role="button" >&#xe5cd</i>
    <i class="material-icons btn-color" role="button">&#xe40a</i>
  `;
  return note;
}


function deleteNote(noteId){
  sendNotePostRequest(
    {"noteId":noteId,"action":2},
    function(jsonResponse){
      if ( jsonResponse.isDeleted ){
        note = document.getElementById(noteId);
        notesContainer = document.getElementById("notes-container");
        notesContainer.removeChild(note);
      }
    });
}