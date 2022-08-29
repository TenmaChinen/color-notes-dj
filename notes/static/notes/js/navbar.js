
const navTools = document.getElementById("nav-tools");
const navToolsSmall = document.getElementById("nav-tools-sm");

const btnNavTools = document.getElementById("btn-nav-tools");

const btnLogin = document.getElementById("btn-login");
const btnSignup = document.getElementById("btn-sign-up");

const btnLogout = document.getElementById("btn-logout");

/*   F U N C T I O N S   */

function toggleNavTools() {
  const state = !isNavToolsVisible();
  navTools.style.setProperty("display", state ? "flex" : "none");
}

function isNavToolsVisible(){
  return navTools.style.getPropertyValue("display") != "none";
}

function isNavToolsSmallVisible(){
  const style = getComputedStyle(navToolsSmall);
  return style.display != "none";
}

/*   E V E N T S   */

const navbarMediaQuery = window.matchMedia("(max-width: 450px)");
navbarMediaQuery.addEventListener("change", setNavbarMediaQuery);

setNavbarMediaQuery(navbarMediaQuery);

function setNavbarMediaQuery(event) {
  if (event.matches) {
    navTools.style.setProperty("display", "none");
  } else {
    navTools.style.setProperty("display", "flex");
  }
}