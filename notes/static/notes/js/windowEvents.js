
let isBelow900;

/*   D R A W E R   */
const drawerMediaQuery = window.matchMedia("(max-width: 900px)");
drawerMediaQuery.addEventListener("change", setDrawerMediaQuery);
setDrawerMediaQuery(drawerMediaQuery);

// Avoid closing Drawer if space is enough
function setDrawerMediaQuery(eventMQ) {
  isBelow900 = eventMQ.matches;
}

/*   O N   C L I C K   */

window.onclick = function (event) {
  if (isBelow900) {
    if (isDrawerVisible() && !(event.target.closest(".drawer") || event.target.matches("#btn-drawer"))) {
      toggleDrawer();
    }
  }
  
  if(isNavToolsSmallVisible() && isNavToolsVisible()){
    if ( !event.target.closest("#nav-tools") && !event.target.matches("#btn-nav-tools")){
      toggleNavTools();
    }
  }
  /* Close Drawer On Clicking Outside */
}