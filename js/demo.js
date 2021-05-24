const iframe = document.querySelector("iframe");
const articleVer = document.querySelector(".contents .article");
const appealVer = document.querySelector(".contents .appeal");

const justifyIframe = (bottomOffset, width) => {
  const DE = iframe.contentWindow.document.documentElement;
  const check3 = document.getElementById("c3");
  if(check3.checked && window.innerWidth >= 1080) width = 375;

  if(width) iframe.style.width = width + "px";
  else {
    if(window.innerWidth < 1080) {
      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        iframe.style.width = window.innerWidth - 10 + "px";
      } else {
        iframe.style.width = window.innerWidth - 25 + "px";
      }

      if(check3.checked) {
        check3.checked = false;
      }
    } else {
      iframe.style.width = 1050 + "px";
    }
  }
  
  const bottom = DE.getBoundingClientRect().bottom;
  iframe.style.height = bottom + bottomOffset + "px";
}

window.addEventListener('load', () => justifyIframe(50));
window.addEventListener('resize', () => justifyIframe(0));


/****** 表示コンテンツの切り替え ******/

const changeContents = () => {
  const iframeDoc = iframe.contentWindow.document;
  const section = iframeDoc.querySelectorAll("section");
  const c3 = iframeDoc.getElementById("c3");

  for(const sec of section) {
    if(sec.classList.contains("active")) sec.classList.remove("active");
    else sec.classList.add("active");
    c3.dispatchEvent(e);
  }
  justifyIframe(0)
}

articleVer.addEventListener("click", () => {
  if(!articleVer.classList.contains("active")) {
    changeContents();
    appealVer.classList.remove("active");
    articleVer.classList.add("active");
  }
});

appealVer.addEventListener("click", () => {
  if(!appealVer.classList.contains("active")) {
    changeContents();
    articleVer.classList.remove("active");
    appealVer.classList.add("active");
  }
});


/****** 表示オプション ******/

let e = document.createEvent("HTMLEvents");
e.initEvent("change", true, true);

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
  if(check3.checked) justifyIframe(50, 375);
  else justifyIframe(0, 1050);
});