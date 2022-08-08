
const navTools = document.getElementById("nav-tools");

const btnNavTools = document.getElementById("btn-nav-tools");

const btnLogin = document.getElementById("btn-login");
const btnSignup = document.getElementById("btn-sign-up");

const btnUsername = document.getElementById("btn-username");
const btnLogout = document.getElementById("btn-logout");

/*   F U N C T I O N S   */

function toggleNavTools() {
  const state = navTools.style.getPropertyValue("display") == "none";

  navTools.style.setProperty("display", state ? "flex" : "none");
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