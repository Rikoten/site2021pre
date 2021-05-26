const body = document.querySelector("body");

const hoverAction = () => {
  let elems = [];
  let classlist = "hover-div";

  const headerTop = document.querySelector("header .header-top");
  const desc = document.querySelector("header .desc");
  const iframe = document.querySelectorAll(".iframe-wrapper");
  const h2 = document.querySelectorAll(".article h2");
  const h3 = document.querySelectorAll(".article h3");

  elems.push({"item": headerTop, "name": "サムネイル＋企画名"});
  elems.push({"item": desc, "name": "企画紹介文"});
  elems.push({"item": iframe[0], "name": "メイン動画"});
  elems.push({"item": iframe[1], "name": "補助動画"});
  for(const h of h2) elems.push({"item": h, "name": "大見出し"});
  for(const h of h3) elems.push({"item": h, "name": "小見出し"});
  elems = elems.reverse();

  const hoverDiv = document.querySelectorAll(".hover-div");
  if(hoverDiv.length) {
    if(hoverDiv[0].classList.contains("hover")) classlist += " hover";
    for(const div of hoverDiv) div.remove();
  }

  for(const elem of elems) {
    if(elem.item && !elem.item.classList.contains("inactive")) {
      if(elem.item.getBoundingClientRect().height !== 0) {
        const top = elem.item.getBoundingClientRect().top;
        const height = elem.item.getBoundingClientRect().height;
        body.insertAdjacentHTML("beforeend", `<div class = "${classlist}" style = "height: ${height+20}px; top: ${top-10}px;"><div>${elem.name}</div></div>`);
      }
    }
  }
}

window.addEventListener("resize", () => hoverAction());

const c2 = document.getElementById("c2");
c2.addEventListener("change", () => hoverAction());

const c3 = document.getElementById("c3");
c3.addEventListener("change", () => hoverAction());



const quizEvent = () => {
  const $options = document.querySelectorAll(".quiz li");

  for(const option of $options) {
    option.addEventListener("click", () => {
      const commentary = option.parentNode.nextElementSibling;

      if(!commentary.classList.contains("commentary-open")) {
        if(option.classList.contains("correct-answer")) {
          option.classList.add("correct");
        } else {
          option.classList.add("incorrect");
        }
        commentary.classList.add("commentary-open");
        commentary.style.height = commentary.scrollHeight + "px";
        commentary.previousElementSibling.classList.add("open");
        setTimeout(() => {
          commentary.style.height = "auto";
        }, 800);
      }
    });
  }
}

quizEvent();