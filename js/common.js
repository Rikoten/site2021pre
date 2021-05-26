const menuOpener = document.querySelector("nav .menu-opener");
const menuClose = document.querySelector("nav .menu-close");
const menu = document.querySelector("nav .menu");
const menuCloseTarget = document.querySelector("nav .menu-close-target");
const header = document.querySelector(".header");

menuOpener.addEventListener("click", () => {
  menu.style.transform = "none";
  menu.classList.add("active");
  menuCloseTarget.classList.add("active");
  document.addEventListener('touchmove', noScroll, { passive: false });
  document.addEventListener('mousewheel', noScroll, { passive: false });
});

menuCloseTarget.addEventListener("click", () => closeMenu());
menuClose.addEventListener("click", () => closeMenu());

const closeMenu = () => {
  menu.style.transform = "translateX(100%)";
  menu.classList.remove("active");
  menuCloseTarget.classList.remove("active");
  document.removeEventListener('touchmove', noScroll, { passive: false });
  document.removeEventListener('mousewheel', noScroll, { passive: false });
}

const noScroll = (event) => {
  event.preventDefault();
}

window.addEventListener("scroll", () => changeMenuOpenerColor());

if(!navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
  window.addEventListener("resize", () => changeMenuOpenerColor());
}

const changeMenuOpenerColor = () => {
  const headerHeight = header.getBoundingClientRect().height;
  const scrollHeight = window.pageYOffset;

  if(headerHeight - 25 < scrollHeight) {
    if(!menuOpener.classList.contains("black")) menuOpener.classList.add("black");
  } else {
    if(menuOpener.classList.contains("black")) menuOpener.classList.remove("black");
  }
}