
const colors = {
  0: "rgb(200, 200, 200)", // Gray
  1: "rgb(118, 182, 255)", // Blue
  2: "rgb(255, 145, 145)", // Red
  3: "rgb(165, 235, 118)", // Green
  4: "rgb(255, 171, 118)", // Orange
  5: "rgb(255, 151, 246)", // Violet
  6: "rgb(255, 225, 118)"  // Yellow
};

function setNoteColor(noteId, colorId) {
  const color100 = colors[colorId];
  const color80 = lightenRGBColor(color100, -20);
  const color50 = lightenRGBColor(color100, -50);

  const note = document.getElementById(noteId);
  note.style.setProperty("background-color", color100);

  const inputs = note.querySelectorAll(".input");
  inputs.forEach(input => {
    input.style.setProperty("color", color50);
  });

  const icons = note.querySelectorAll(".tool-box i");
  icons.forEach(icon => {
    icon.style.setProperty("background-color", color100);
    icon.style.setProperty("color", color50);
  });

  const textBox = note.querySelector(".text-box");
  textBox.style.setProperty("border-top-color", color80);
  if ( noteId === "note-ph" ){
    const color150 = lightenRGBColor(color100, 50);
    const color105 = lightenRGBColor(color100, 5);
    btnAddPH.style.setProperty("color",color150);
    btnAddPH.style.setProperty("background-color",color105);
  }
}


function lightenRGBColor(rgbColor, percent) {
  const amt = Math.round(2.55 * percent);
  const rgb = rgbColor.substring(4, rgbColor.length - 1).split(",");
  rgb.forEach((c, idx) => rgb[idx] = parseInt(c) + amt);
  rgb.forEach((c, idx) => rgb[idx] = c < 255 ? c < 1 ? 0 : c : 255);
  return `rgb(${rgb.join(",")})`;
};


// Notes must be created by Django before setting this
function setNotesColors(notesContainerId) {
  const notesContainer = document.getElementById(notesContainerId);
  notesContainer.querySelectorAll(".note").forEach(note => {
    const dropdown = note.querySelector(".dropdown");
    if (dropdown != null) {
      setNoteColor(note.id, dropdown.getAttribute("currColorId"));
    }
  });
}