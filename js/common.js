const menuOpener = document.querySelector("nav .menu-opener");
const menuClose = document.querySelector("nav .menu-close");
const menu = document.querySelector("nav .menu");
const menuCloseTarget = document.querySelector("nav .menu-close-target");

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