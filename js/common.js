const menuOpener = document.querySelector("nav .menu-opener");
const menuClose = document.querySelector("nav .menu-close");
const menu = document.querySelector("nav .menu");
const menuCloseTarget = document.querySelector("nav .menu-close-target");

menuOpener.addEventListener("click", () => {
  menu.style.transform = "none";
  menu.classList.add("active");
  menuCloseTarget.classList.add("active");
});

menuCloseTarget.addEventListener("click", () => closeMenu());
menuClose.addEventListener("click", () => closeMenu());

const closeMenu = () => {
  menu.style.transform = "translateX(100%)";
  menu.classList.remove("active");
  menuCloseTarget.classList.remove("active");
}