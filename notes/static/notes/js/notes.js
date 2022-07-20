
const notePH = document.getElementById("note-placeholder");
const btnCloseNotePH = notePH.querySelector(".btn-close");
const textBoxPH = notePH.querySelector(".text-box");
const textareaPH = notePH.querySelector(".textarea");
const btnSavePH = notePH.querySelector(".btn-save");

closePH();

let timer = 0

function delayTrigger(noteId){
  clearTimeout(timer);
  timer = setTimeout(updateNote,1000,noteId);
}


function openNoteCreator(){

  if ( textBoxPH.style["display"] == "none"){
    textBoxPH.style["display"] = "block";
    btnCloseNotePH.style["visibility"] = "visible";
    btnSavePH.style["visibility"] = "visible" ;
    textareaPH.focus();
  }
}

function closePH(){
  console.log("DEBUG");
  textBoxPH.style["display"] = "none";
  btnCloseNotePH.style["visibility"] = "hidden";
  btnSavePH.style["visibility"] = "hidden";
}


function createNote(){
  noteData = getNoteData("note-placeholder",false);
  sendNotePostRequest(
    {"note":noteData},
    function(jsonResponse){
      noteData.id = jsonResponse.id;
      addNoteElement(noteData);
      clearNoteCreator();
    },
    "/notes/create/"
    );
}

function addNoteElement(noteData){
  notesContainer = document.getElementById("notes-container")
  firstNote = notesContainer.children[1];
  newNote = createNoteElement(noteData);
  notesContainer.insertBefore(newNote,firstNote);
}

function clearNoteCreator(){

}


function createNoteElement(noteData){
  const note = document.createElement("div");
  note.classList.add("card");
  note.id = noteData.id;
  note.innerHTML = `
    <input class="input" name = "title" placeholder="Title" value = "${noteData.title}" maxlength="100" autocomplete="off" onkeyup="delayTrigger('${noteData.id}')"></input>
    <div class="text-box">
      <div class="scroll-box">
        <span class="input textarea" type="text" name="text" role="textbox" contenteditable placeholder="Text" onkeyup="delayTrigger('${noteData.id}')">${noteData.text}</span>
      </div>
      <div class="tools-box">
        <i class="material-icons btn-color" role="button">&#xe40a</i>
        <i class="material-icons btn-fontsize" role="button">&#xe262</i>
      </div>
      <i class="material-icons btn-close" role="button" onclick="deleteNote('${note.id}')">&#xe5cd</i>
    </div>
  `;
  return note;
}


function updateNote(noteId){
  noteData = getNoteData(noteId,false);
  sendNotePostRequest(
    {"note":noteData},null,`/notes/update/${noteId}/`);
}

function deleteNote(noteId){
  sendNotePostRequest(
    null,
    function(jsonResponse){
      if ( jsonResponse.isDeleted ){
        console.log(jsonResponse.isDeleted);
        note = document.getElementById(noteId);
        notesContainer = document.getElementById("notes-container");
        notesContainer.removeChild(note);
      }
    },
    `/notes/delete/${noteId}/`);
}

/* REQUEST */

function sendNotePostRequest(data,callback,url){

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
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



/* UTILS */

function getNoteData(noteId,storeId){
  const note = document.getElementById(noteId);
  const noteInputs = note.querySelectorAll(".input");
  const noteData = storeId ? {"id":noteId} : {};
 
  noteInputs.forEach(function(input){
    const name = input.getAttribute("name");
    if (input.tagName == "INPUT" ){
      noteData[name] = input.value;
    }else{
      noteData[name] = input.textContent;
    }
  });
  return noteData;
}