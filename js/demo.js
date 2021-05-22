const iframe = document.querySelector("iframe");

window.addEventListener('load', () => {
  const DE = iframe.contentWindow.document.documentElement;

  iframe.style.height = DE.scrollHeight + 100 + "px";
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


const check1 = document.getElementById("c1");

check1.addEventListener("change", () => {
  const iframeDoc = iframe.contentWindow.document;
  const hoverDiv = iframeDoc.querySelectorAll(".hover-div");

  if(check1.checked) {
    for(const div of hoverDiv) {
      div.classList.add("hover");
    }
  } else {
    for(const div of hoverDiv) {
      div.classList.remove("hover");
    }
  }
});

let e = document.createEvent("HTMLEvents");
e.initEvent("change", true, true);
const check2 = document.getElementById("c2");

check2.addEventListener("change", () => {
  const iframeDoc = iframe.contentWindow.document;
  const mainMovie = iframeDoc.querySelector(".main-movie");
  const c2 = iframeDoc.getElementById("c2");

  if(check2.checked) {
    if(!mainMovie.classList.contains("inactive")) {
      mainMovie.classList.add("inactive")
    }
    c2.dispatchEvent(e);
  } else {
    if(mainMovie.classList.contains("inactive")) {
      mainMovie.classList.remove("inactive")
    }
    c2.dispatchEvent(e);
  }
});

const check3 = document.getElementById("c3");

check3.addEventListener("change", () => {
  const iframeDoc = iframe.contentWindow.document;
  const section = iframeDoc.querySelectorAll("section");
  const c3 = iframeDoc.getElementById("c3");

  for(const sec of section) {
    if(sec.classList.contains("active")) sec.classList.remove("active");
    else sec.classList.add("active");
    c3.dispatchEvent(e);
  }
});