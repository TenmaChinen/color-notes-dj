const TEXTAREA_MAX_CHARS = 800;
const notesContainer = document.getElementById("notes-container");

/*   F U N C T I O N S   */

function addNotesElement(notesData) {
  notesData.map(addNoteElement);
}

function addNoteElement(noteData) {
  noteData.id = `note-${noteData.id}`;
  const firstNote = notesContainer.children[1];
  const newNote = createNoteElement(noteData);
  notesContainer.insertBefore(newNote, firstNote);
  setNoteColor(noteData.id, noteData.color_id);
}

function addNotesDropdownOptions() {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(dropdown => createDropdownOptions(dropdown));
}

function createNotePH() {
  const noteData = { id: "note-ph", title: "", text: "", color_id: 0 };
  const notePH = createNoteElement(noteData);
  notePH.innerHTML += `<i id="btn-add-ph" class="material-icons" role="button" onclick="addNewNote()">&#xe145</i>`;
  notesContainer.prepend(notePH);
  return notePH;
}

function setNotePHDisplay(state) {
  notePH.style.setProperty("display", state ? "block" : "none");
}


/*   C R E A T O R S   */


function createNoteElement(noteData) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.id = noteData.id;
  note.innerHTML = `
    <input style="display:none" type="text" name="patch" autocomplete="off" />
    <input type="text" class="input title" name="title" maxlength="40" placeholder="Title" value = "${noteData.title}" autocomplete="ÑÖcompletes" onkeyup="delayTrigger(event,'${noteData.id}')">
    <div class="text-box">
      <div class="scroll-box">
        <span class="input textarea" type="text" name="text" role="textbox" contenteditable placeholder="Text" onkeyup="delayTrigger(event,'${noteData.id}')"></span>
      </div>
    </div>
    <div class="tool-box">
      <i class="material-icons btn-close" role="button" onclick="onClickDeleteNote('${noteData.id}')">&#xe5cd</i>
      <div class="menu-color">
        <i class="material-icons btn-color" onclick="openMenu(event)" tabindex="-1" role="button">&#xe40a</i>
        <div class="dropdown" currColorId=${noteData.color_id} onfocusout="onContainerFocusOut(event)" tabindex="0"
          onoptionselected="onColorSelected(colorId,'${noteData.id}')">
        </div>
      </div>
    </div>
  `;

  /* This is needed to convert new lines to <br> */
  const textarea = note.querySelector(".textarea");
  textarea.innerText = noteData.text;
  textarea.setAttribute("onkeydown", "onTextAreaKeyDown(event)");
  textarea.addEventListener("paste", onTextareaPaste);

  createDropdownOptions(note.querySelector(".dropdown"));
  return note;
}

function clearNoteElements() {
  const firstChild = notesContainer.firstChild;
  notesContainer.innerHTML = null;
  notesContainer.appendChild(firstChild);
}

/*   E V E N T S   */

function onTextareaPaste(event) {
  // cancel paste
  event.preventDefault();

  const plainText = (event.originalEvent || event).clipboardData.getData('text/plain');

  // insert text manually
  document.execCommand("insertHTML", false, plainText);

  const totalText = event.srcElement.innerText;
  if (totalText.length >= TEXTAREA_MAX_CHARS) {
    event.srcElement.innerText = totalText.slice(0, TEXTAREA_MAX_CHARS);
  }
  // navigator.clipboard.writeText(plainText);
}

let varTest;

function onTextAreaKeyDown(event) {
  /* Any Shortcut except Ctrl + V */
  const isValidShortcut = (event.ctrlKey && event.keyCode != 86 );
  /* Backspace - Delete - Arrow Keys - Ctrl - Shift */
  const isValidKeyCode = [8, 16, 17, 37, 38, 39, 40, 46].includes(event.keyCode);
  const text = event.srcElement.innerText;

  if (text.length >= TEXTAREA_MAX_CHARS && !isValidKeyCode && !isValidShortcut ) {
    event.preventDefault();
  }
}
