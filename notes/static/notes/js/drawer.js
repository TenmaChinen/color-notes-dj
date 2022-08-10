const drawer = document.getElementById("drawer");
const drawerScroll = document.getElementById("drawer-scroll");
const navTitle = document.getElementById("nav-title");
const btnDrawer = document.getElementById("btn-drawer");

const groupInputPH = document.querySelector("#group-ph>input");
const btnGroupAddPH = document.querySelector("#group-ph > .btn-group-add");

let currNoteGroup;

/*   I N I T I A L I Z E   */

drawer.style.setProperty("display", "none");
updateBtnAddGroupState();

// drawerScroll.querySelectorAll(".note-group>input").forEach(setNoteGroupAttributes);

/*   F U N C T I O N S   */

function toggleDrawer() {
  const state = isDrawerVisible();
  drawer.style.setProperty("display", state ? "none" : "block");
  btnDrawer.innerHTML = state ? "&#xe5d2" : "&#xe9bd";
}

function isDrawerVisible() {
  return drawer.style.getPropertyValue("display") !== "none";
}

function getNoteGroupId() {
  if (currNoteGroup) {
    return currNoteGroup.id;
  }
}

function deleteNoteGroup(groupId) {
  const group = document.getElementById(groupId);
  drawerScroll.removeChild(group);
}

function clearGroupPH() {
  groupInputPH.value = "";
  updateBtnAddGroupState();
  groupInputPH.blur();
}


function selectGroup(noteGroup,triggerCallback=true) {
  const groupInput = noteGroup.querySelector("input");
  noteGroup.style.setProperty("background-color", "rgb(200,200,200,0.2)");
  navTitle.innerHTML = groupInput.value;
  
  if (noteGroup != currNoteGroup) {
    if (currNoteGroup !== null) {
currNoteGroup.style.setProperty("background-color", null);
    }
    currNoteGroup = noteGroup;
    if (onSelectGroupCallback && triggerCallback) onSelectGroupCallback(noteGroup.id);
  }
}

function getGroupIndex(groupId){
  return [...drawerScroll.children].indexOf(document.getElementById(groupId));
}

/*  S E T T E R S  */

function setNoteGroupAttributes(noteGroup) {
  const groupInput = noteGroup.querySelector("input")
  noteGroup.setAttribute("onclick", "onClickNoteGroup(this)");
  groupInput.readOnly = true;
  groupInput.setAttribute("ondblclick", "onDblClickNoteGroup(event)");
  groupInput.setAttribute("onkeydown", "onKeyDownNoteGroup(event)");
  groupInput.setAttribute("onfocusout", "onFocusOutNoteGroup(event)");
  groupInput.style.setProperty("cursor", "pointer");

  const btnDrop = noteGroup.querySelector(".btn-group-drop");
  btnDrop.setAttribute("onclick", "onClickOptionsNoteGroup(event)")
  btnDrop.setAttribute("tabindex", "0");
  createNoteGroupDropMenu(noteGroup, noteGroup.id);
}


function enableNoteGroupEdit(groupId = null, groupInput = null, mode) {
  groupInput = groupId ? document.querySelector(`#${groupId}>input`) : groupInput;
  const group = groupInput.parentElement;

  group.querySelector(".btn-group-drop").style.setProperty("display", mode ? "none" : "block");
  group.querySelector(".btn-group-save").style.setProperty("display", mode ? "block" : "none");
  groupInput.readOnly = !mode;

  if (mode) {
    groupInput.focus();
    groupInput.select();
    groupInput.lastValue = groupInput.value;
  } else {
    groupInput.blur();
  }
}

function setDefaultNavTitle() {
  const groupInput = document.querySelector(".note-group>input");
  navTitle.innerHTML = (groupInput != null) ? groupInput.value : "Color Notes";
}


function updateBtnAddGroupState() {
  const isEmpty = groupInputPH.value === "";
  btnGroupAddPH.setAttribute("onclick", isEmpty ? null : "onClickAddGroup()");
  btnGroupAddPH.style.setProperty("opacity", isEmpty ? 0.5 : 1);
}

/*   E V E N T S   :   D R A W E R    */

function onClickNoteGroup(noteGroup) {
  selectGroup(noteGroup);
}

function onDblClickNoteGroup(event) {
  enableNoteGroupEdit(null, event.srcElement, true);
}

function onKeyDownNoteGroup(event) {
  // Key => Enter
  if (event.keyCode == 13) enableNoteGroupEdit(null, event.srcElement, false);
}

/*  E V E N T S   :   I N P U T   G R O U P   O P T I O N S   */

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
  const btnDrop = event.srcElement.parentElement.querySelector(".btn-group-drop");
  if (event.relatedTarget != btnDrop) {
    event.srcElement.style.setProperty("display", "none");
  }
}

function onClickDropMenuOption(event, noteGroupId) {
  const option = event.srcElement.innerHTML;
  switch (option) {
    case "Delete":
      onDeleteGroupCallback(noteGroupId,getGroupIndex(noteGroupId));
      break;
    case "Edit":
      enableNoteGroupEdit(noteGroupId, null, true);
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
      if (isDrawerVisible() && !(event.target.closest(".drawer") || event.target.matches("#btn-drawer"))) {
        toggleDrawer();
      }
    }
  } else {
    window.onclick = null;
  }
}

function onClickAddGroup(event) {
  onAddGroup();
}

function onKeyUpGroupInput() {
  updateBtnAddGroupState();
}

function onKeyDownGroupInput(event) {
  // Key => Enter
  if (event.keyCode == 13) onAddGroup();
}

/*   C R E A T O R S   */

function createNoteGroup(id, title) {
  const noteGroup = document.createElement("div");
  noteGroup.id = `group-${id}`;
  noteGroup.classList.add("note-group");
  noteGroup.innerHTML = `
      <input value="${title}" type="text" readonly>
      <i class="material-icons btn-group-save" style="display:none" onclick="enableNoteGroupEdit('${noteGroup.id}',null,false)">&#xe161</i>
      <i class="material-icons btn-group-drop">&#xe5d4</i>
    `;
  setNoteGroupAttributes(noteGroup);
  drawerScroll.prepend(noteGroup);
  return noteGroup;
}

function createNoteGroupDropMenu(noteGroup, noteGroupInputId) {
  noteGroup.innerHTML += `
    <div class="drop-menu" style="display:none;" onfocusout="onFocusOutDropMenu(event)" tabindex="0">
      <span onclick="onClickDropMenuOption(event,'${noteGroupInputId}')">Edit</span>
      <span onclick="onClickDropMenuOption(event,'${noteGroupInputId}')">Delete</span>
    </div>
  `;
}