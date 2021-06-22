const MENU_BOX = document.getElementsByClassName("container")[0];
const MENU = document.getElementsByTagName("nav")[0];
const BRK_POINTS = document.querySelectorAll(".breakpoint");
const SCROLL_DISTANCES = [];
const LINKS = Array.from(document.getElementsByClassName("menu_link"));
const MENU_ICON_OPEN = document.getElementById("open_menu");
const MENU_ICON_CLOSE = document.getElementById("close_menu");

function smoothScroll(e) {
  e.preventDefault();
  let targetId = this.getAttribute("href");
  let targetSection = document.querySelector(targetId);
  if (!targetSection) return;

  let toTop = distanceToTop(targetSection);
  window.scrollBy({ top: toTop, left: 0, behavior: "smooth" });

  let checkIfDone = setInterval(function () {
    let reachedBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (distanceToTop(targetSection) === 0 || reachedBottom) {
      targetSection.tabIndex = "-1";
      targetSection.focus();
      window.history.pushState("", "", targetId);
      clearInterval(checkIfDone);
    }
  }, 100);
}

function toggleMenuOnClick() {
  this.classList.remove("show");

  if (this === MENU_ICON_OPEN) {
    // activates when open menu icon is clicked
    MENU_ICON_CLOSE.classList.add("show");
    MENU_BOX.classList.add("show_menu");
    MENU.classList.add("show_menu");
  } else {
    // activates when close menu icon is clicked
    MENU_ICON_OPEN.classList.add("show");
    MENU_BOX.classList.remove("show_menu");
    MENU.classList.remove("show_menu");
  }
}

// window.addEventListener("scroll", debounce(fixMenu));
// window.addEventListener("resize", debounce(getBreakPoints, 500));
// window.addEventListener("scroll", debounce(activateMenuOnScroll));

LINKS.forEach((MenuLink) => MenuLink.addEventListener("click", smoothScroll));
MENU_ICON_OPEN.addEventListener("click", toggleMenuOnClick);
MENU_ICON_CLOSE.addEventListener("click", toggleMenuOnClick);
