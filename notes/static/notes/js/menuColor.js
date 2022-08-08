

function createDropdownOptions(dropdown) {
	// const colorId = dropdown.getAttribute("currColorId");
	dropdown.style.setProperty("display", "none");

	Object.keys(colors).forEach(colorId => {
		dropdown.innerHTML += createOptionTemplate(colorId, colors[colorId]);
	});
}

function createOptionTemplate(colorId, color) {
	return `<div colorId="${colorId}" class="option" style="background-color:${color}" onclick="onPressOption(event)"></div>`;
}


function onPressOption(event) {
	
	// Set the pressed button color as Active
	const btnCurr = event.srcElement; // Current Pressed Option Button
	btnCurr.className = "option option-active";
	
	// Remove Active State from last color button
	const dropdown = btnCurr.parentElement;
	const lastColorId = dropdown.getAttribute("currColorId");
	const btnLast = dropdown.querySelector(`div[colorId='${lastColorId}']`);
	btnLast.className = "option";

	// save the current color state in dropdown element.
	const colorId = btnCurr.getAttribute("colorId");
	dropdown.setAttribute("currColorId", colorId);

	// Trigger the callback with the current note and color Id.
	let callback = dropdown.getAttribute("onoptionselected");
	callback = callback.replace("colorId",`"${colorId}"`);
	eval(callback);
}


function openMenu(event) {
	const btnMenu = event.srcElement;
	const menu = btnMenu.parentElement;
	const dropdown = menu.querySelector(".dropdown");

	// Toggle dropdown menu
	if (dropdown.style.display == "none") {
		setMenuState(btnMenu, dropdown, true);
		dropdown.focus();
	} else {
		setMenuState(btnMenu, dropdown, false);
	}
}


function onContainerFocusOut(event) {
	const dropdown = event.srcElement;
	const btnMenu = dropdown.parentElement.querySelector(".btn-color");

	if (event.relatedTarget != btnMenu) {
		setMenuState(btnMenu, dropdown, false);
	}
}


function setMenuState(btnMenu, dropdown, active) {
	btnMenu.style.setProperty("outline", active ? "2px solid white" : "none");
	dropdown.style.setProperty("display", active ? "grid" : "none");
}