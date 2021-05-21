const iframe = document.querySelector("iframe");

window.addEventListener('load', () => {
  const DE = iframe.contentWindow.document.documentElement;

  iframe.style.height = DE.scrollHeight + "px";
});

const PCVer = document.querySelector(".view-mode .pc");
const MBVer = document.querySelector(".view-mode .mobile");

PCVer.addEventListener("click", () => {
  if(!PCVer.classList.contains("active")) {
    iframe.style.width = "1050px";
    MBVer.classList.remove("active");
    PCVer.classList.add("active");
  }
});

MBVer.addEventListener("click", () => {
  if(!MBVer.classList.contains("active")) {
    iframe.style.width = "375px";
    PCVer.classList.remove("active");
    MBVer.classList.add("active");
  }
});