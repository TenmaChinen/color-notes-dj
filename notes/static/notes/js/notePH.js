
// const notePH = document.getElementById("note-ph");
const titlePH = notePH.querySelector(".title");
const textareaPH = notePH.querySelector(".textarea");
const textBoxPH = notePH.querySelector(".text-box");
const toolBoxPH = notePH.querySelector(".tool-box");
const dropdownPH = notePH.querySelector(".dropdown");
const btnClosePH = notePH.querySelector(".btn-close");
const btnAddPH = notePH.querySelector(".btn-add");

setNotePHVisibility(false);

titlePH.setAttribute("onclick", "onPressNotePH()");
btnClosePH.setAttribute("onclick", "onPressBtnClosePH()");
notePH.setAttribute("tabindex", "-1");
notePH.setAttribute("onkeydown", "onKeyPressPH(event)");

titlePH.removeAttribute("onkeyup");
textareaPH.removeAttribute("onkeyup");

/*   F U N C T I O N S   */

function setNotePHVisibility(visible) {
  textBoxPH.style.setProperty("display", visible ? "block" : "none");
  toolBoxPH.style.setProperty("visibility", visible ? "visible" : "hidden");
  btnAddPH.style.setProperty("visibility", visible ? "visible" : "hidden");

  if (visible) {
    textareaPH.focus();
  } else {
    titlePH.value = "";
    textareaPH.textContent = "";
  }
}


function clearNotePHContent(){
  titlePH.value = "";
  textareaPH.innerHTML = "";
  
  setNotePHVisibility(false);
}

/*   E V E N T S   */

function onPressNotePH() {
  if (textBoxPH.style.getPropertyValue("display") == "none") {
    setNotePHVisibility(true);
  }
}

function onPressBtnClosePH() {
  setNotePHVisibility(false);
}


function onKeyPressPH(event) {
  if (event.keyCode == 27) {
    setNotePHVisibility(false);
  }
}


