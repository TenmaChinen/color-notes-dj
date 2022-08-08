
// Function depending on menuColor.js
function createNotesDropdownOptions(){
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(dropdown => createDropdownOptions(dropdown));
}


function createNotePH() {
  const notesContainer = document.getElementById("notes-container");
  const noteData = {id:"note-ph",title:"",text:"",color_id:0};
  const notePH = createNoteElement(noteData);
  notesContainer.prepend(notePH);
  setNoteColor(noteData.id, noteData.color_id);
  return notePH;
}


function addNotesElement(notesData){
  notesData.map(addNoteElement);
}

function addNoteElement(noteData) {
  noteData.id = `note-${noteData.id}`;
  const notesContainer = document.getElementById("notes-container")
  const firstNote = notesContainer.children[1];
  const newNote = createNoteElement(noteData);
  notesContainer.insertBefore(newNote, firstNote);
  setNoteColor(noteData.id, noteData.color_id);
}


function createNoteElement(noteData) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.id = noteData.id;
  note.innerHTML = `
    <input class="input title" name = "title" placeholder="Title" value = "${noteData.title}" maxlength="100" autocomplete="off" onkeyup="delayTrigger(event,'${noteData.id}')"></input>
    <div class="text-box">
      <div class="scroll-box">
        <span class="input textarea" type="text" name="text" role="textbox" contenteditable placeholder="Text" onkeyup="delayTrigger(event,'${noteData.id}')">${noteData.text}</span>
      </div>
    </div>
    <div class="tool-box">
      <i class="material-icons btn-close" role="button" onclick="onClickDeleteNote('note-{{note.id}}')">&#xe5cd</i>
      <div class="menu-color">
        <i class="material-icons btn-color" onclick="openMenu(event)" tabindex="-1" role="button">&#xe40a</i>
        <div class="dropdown" currColorId=${noteData.color_id} onfocusout="onContainerFocusOut(event)" tabindex="0"
          onoptionselected="onColorSelected(colorId,'${noteData.id}')">
        </div>
      </div>
    </div>
  `;

  createDropdownOptions(note.querySelector(".dropdown"));
  return note;
}


function createAddButton(parent) {
  parent.innerHTML +=
  `<i class="material-icons btn-add" role="button" onclick="addNewNote()">&#xe145</i>`;
  // `<i class="material-icons btn-add" role="button" onclick="addNewNote('${parent.parentElement.id}')">&#xe145</i>`;
}




function clearNoteElements(){
  const firstChild = notesContainer.firstChild;
  notesContainer.innerHTML = null;
  notesContainer.appendChild(firstChild);
}