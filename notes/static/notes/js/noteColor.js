
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
  const color50 = colors[colorId];
  const color35 = lightenRGBColor(color50, -20);
  const color20 = lightenRGBColor(color50, -50);

  const note = document.getElementById(noteId);
  note.style.setProperty("background-color", color50);

  const inputs = note.querySelectorAll(".input");
  inputs.forEach(input => {
    input.style.setProperty("color", color20);
  });

  const icons = note.querySelectorAll(".tool-box i");
  icons.forEach(icon => {
    icon.style.setProperty("background-color", color50);
    icon.style.setProperty("color", color20);
  });

  const textBox = note.querySelector(".text-box");
  textBox.style.setProperty("border-top-color", color35);
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