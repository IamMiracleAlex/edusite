/* --------------------------------------- */
/*              Dom Helpers                */
/* --------------------------------------- */
function get(name, from = document) {
  if (from.querySelector(name)) return from.querySelector(name);
  throw new Error(`The specified element ${name} was not found`);
}

function getAll(name, from = document) {
  if (from.querySelectorAll(name)) return [...from.querySelectorAll(name)];
  return [];
}

// Dom elements
const sideBar = get(`[data-name="side_bar"]`);
const sideBarButton = get(`[data-name="side_bar_button"]`);
const navButton = get(`[data-name="nav_button"]`);

// variables
let openSideBar = "sidebar__open";
let closeSideBar = "sidebar__close";

// functions
function handleSideBar() {
  const status = sideBar.dataset.status;
  if (status === "close") {
    sideBar.dataset.status = "open";
    sideBar.classList.add(openSideBar);
    sideBar.classList.remove(closeSideBar);
  } else {
    sideBar.dataset.status = "close";
    sideBar.classList.remove(openSideBar);
    sideBar.classList.add(closeSideBar);
  }
}

// event listeners
sideBarButton.addEventListener("click", handleSideBar);
navButton.addEventListener("click", handleSideBar);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    sideBar.classList.remove("invisible");
  }, 200);
});
