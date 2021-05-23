const iframe = document.querySelector("iframe");
const PCVer = document.querySelector(".view-mode .pc");
const MBVer = document.querySelector(".view-mode .mobile");

const justifyIframe = (offset, width) => {
  const DE = iframe.contentWindow.document.documentElement;
  iframe.style.transition = "none";

  if(width) iframe.style.width = width + "px";
  else {
    if(window.innerWidth < 1080) {
      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        iframe.style.width = window.innerWidth - 10 + "px";
      } else {
        iframe.style.width = window.innerWidth - 25 + "px";
      }

      const active = document.querySelector(".view-mode .active");
      active.classList.remove("active");
      PCVer.classList.add("active");
    } else {
      iframe.style.width = 1050 + "px";
    }
  }

  const bottom = DE.getBoundingClientRect().bottom;
  iframe.style.height = bottom + offset + "px";    

  iframe.style.transition = "all 0.5s cubic-bezier(0, 0, 0.07, 1) 0s";
}

window.addEventListener('load', () => justifyIframe(70));
window.addEventListener('resize', () => justifyIframe(0));

PCVer.addEventListener("click", () => {
  if(!PCVer.classList.contains("active")) {
    justifyIframe(0, 1050);
    MBVer.classList.remove("active");
    PCVer.classList.add("active");
  }
});

MBVer.addEventListener("click", () => {
  if(!MBVer.classList.contains("active")) {
    justifyIframe(0, 375);
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