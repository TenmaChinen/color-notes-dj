const drawer = document.getElementById("drawer");
const navTitle = document.getElementById("nav-title");
const btnDrawer = document.getElementById("btn-drawer");

/*   I N I T I A L I Z E   */

drawer.style.setProperty("display", "none");

// drawer.querySelectorAll(".note-group>input").forEach(setNoteGroupAttributes);

/*   F U N C T I O N S   */

function toggleDrawer() {
  const state = isDrawerVisible();
  drawer.style.setProperty("display", state ? "none" : "block");
  btnDrawer.innerHTML = state ? "&#xe5d2" : "&#xe9bd";
}

function isDrawerVisible() {
  return drawer.style.getPropertyValue("display") !== "none";
}


function getNoteGroupId(){
  return currNoteGroup.id;
}

/*  S E T T E R S  */

function setNoteGroupAttributes(noteGroup) {
  const noteGroupInput = noteGroup.querySelector("input")
  noteGroupInput.readOnly = true;
  noteGroupInput.setAttribute("onclick", "onClickNoteGroup(event)");
  noteGroupInput.setAttribute("ondblclick", "onDblClickNoteGroup(event)");
  noteGroupInput.setAttribute("onkeydown", "onKeyDownNoteGroup(event)");
  noteGroupInput.setAttribute("onfocusout", "onFocusOutNoteGroup(event)");
  noteGroupInput.style.setProperty("cursor", "pointer");
  
  const btnOptions = noteGroup.querySelector(".btn-options");
  btnOptions.setAttribute("onclick", "onClickOptionsNoteGroup(event)")
  btnOptions.setAttribute("tabindex", "0");
  createNoteGroupDropMenu(noteGroup.querySelector(".drop-group"), noteGroup.id);
}


function enableNoteGroupEdit(noteGroupInput, mode) {
  if (mode) {
    noteGroupInput.readOnly = false;
    noteGroupInput.select();
  } else {
    noteGroupInput.readOnly = true;
  }
}

function setDefaultNavTitle() {
  const noteGroupInput = document.querySelector(".note-group>input");
  navTitle.innerHTML = (noteGroupInput != null) ? noteGroupInput.value : "Color Notes";
}

/*   C A L L B A C K S   */

let drawerNoteGroupCallback, onNoteGroupDeleteCallback;

function onNoteGroupSelected(callback) {
  drawerNoteGroupCallback = callback;
}

function onNoteGroupDelete(callback) {
  onNoteGroupDeleteCallback = callback;
}

/*   E V E N T S   :   D R A W E R    */

let currNoteGroup;

function onClickNoteGroup(event) {
  const noteGroupInput = event.srcElement;
  const noteGroup = noteGroupInput.parentElement;
  if (noteGroup != currNoteGroup) {
    noteGroup.style.setProperty("background-color", "rgb(200,200,200,0.2)");
    navTitle.innerHTML = noteGroupInput.value;
    currNoteGroup.style.setProperty("background-color", null);
    currNoteGroup = noteGroup;
    drawerNoteGroupCallback(noteGroup.id);
  }
}

function onDblClickNoteGroup(event) {
  enableNoteGroupEdit(event.srcElement, true);
}

function onKeyDownNoteGroup(event) {
  // Key => Enter
  if (event.keyCode == 13) {
    enableNoteGroupEdit(event.srcElement, false);
  }
}

/*  E V E N T S   :   I N P U T   G R O U P   O P T I O N S   */

function onFocusOutNoteGroup(event) {
  enableNoteGroupEdit(event.srcElement, false);
}

function onClickOptionsNoteGroup(event) {
  const dropGroup = event.srcElement.parentElement;
  const dropMenu = dropGroup.querySelector(".drop-menu");
  const dropMenuState = dropMenu.style.getPropertyValue("display") == "none";
  dropMenu.style.setProperty("display", dropMenuState ? "flex" : "none");
  if (dropMenuState) {
    dropMenu.focus();
  }
}

function onFocusOutDropMenu(event) {
  const btnOptions = event.srcElement.parentElement.querySelector(".btn-options");
  if (event.relatedTarget != btnOptions) {
    event.srcElement.style.setProperty("display", "none");
  }
}

function onClickDropMenuOption(event, noteGroupId) {
  const option = event.srcElement.innerHTML;
  switch (option) {
    case "Delete":
      onNoteGroupDeleteCallback(noteGroupId);
      break;
    case "Edit":
      null;
  }
}

const drawerMediaQuery = window.matchMedia("(max-width: 900px)");
drawerMediaQuery.addEventListener("change", setDrawerMediaQuery);
setDrawerMediaQuery(drawerMediaQuery);

// Avoid closing Drawer if space is enough
function setDrawerMediaQuery(eventMQ) {
  if (eventMQ.matches) {
    window.onclick = function (event) {
      /* Close Drawer On Clicking Outside */
      if (isDrawerVisible() && !(event.target.closest(".drawer") || event.target.matches("#btn-drawer") )) {
        toggleDrawer();
      }
    }
  } else {
    window.onclick = null;
  }
}



/*   C R E A T O R S   */

function createNoteGroup(id, title) {
  const noteGroup = document.createElement("div");
  noteGroup.id = `group-${id}`;
  noteGroup.classList.add("note-group");
  noteGroup.innerHTML = `
      <input value="${title}" type="text" readonly>
      <div class="drop-group"><i class="material-icons btn-options">&#xe5d4</i></div>
    `;
  setNoteGroupAttributes(noteGroup);
  drawer.appendChild(noteGroup);
}

function createNoteGroupDropMenu(dropGroup, noteGroupInputId) {
  dropGroup.innerHTML += `
    <div class="drop-menu" style="display:none;" onfocusout="onFocusOutDropMenu(event)" tabindex="0">
      <span onclick="onClickDropMenuOption(event,'${noteGroupInputId}')">Edit</span>
      <span onclick="onClickDropMenuOption(event,'${noteGroupInputId}')">Delete</span>
    </div>
  `;
}