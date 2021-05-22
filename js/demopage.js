const body = document.querySelector("body");

const hoverAction = () => {
  let elems = [];
  let classlist = "hover-div";

  const headerTop = document.querySelector("header .header-top");
  const desc = document.querySelector("header .desc");
  const iframe = document.querySelectorAll(".iframe-wrapper");
  const h2 = document.querySelectorAll("h2");
  const h3 = document.querySelectorAll("h3");

  elems.push({"item": headerTop, "name": "サムネイル＋企画名"});
  elems.push({"item": desc, "name": "企画紹介文"});
  elems.push({"item": iframe[0], "name": "メイン動画"});
  elems.push({"item": iframe[1], "name": "補助動画"});
  elems.push({"item": h2[0], "name": "大見出し"});
  elems.push({"item": h2[1], "name": "大見出し"});
  elems.push({"item": h3[0], "name": "小見出し"});
  elems.push({"item": h3[1], "name": "小見出し"});
  elems.push({"item": h3[2], "name": "小見出し"});
  elems.push({"item": h3[3], "name": "小見出し"});
  elems = elems.reverse();

  const hoverDiv = document.querySelectorAll(".hover-div");
  if(hoverDiv.length) {
    if(hoverDiv[0].classList.contains("hover")) classlist += " hover";
    for(const div of hoverDiv) div.remove();
  }

  for(const elem of elems) {
    if(elem.item && !elem.item.classList.contains("inactive")) {
      const top = elem.item.getBoundingClientRect().top;
      const height = elem.item.getBoundingClientRect().height == 0 ? 0 : elem.item.getBoundingClientRect().height + 20;
      body.insertAdjacentHTML("beforeend", `<div class = "${classlist}" style = "height: ${height}px; top: ${top-10}px;"><div>${elem.name}</div></div>`);
    }
  }
}

window.addEventListener("resize", () => hoverAction());

const c2 = document.getElementById("c2");
c2.addEventListener("change", () => hoverAction());

const c3 = document.getElementById("c3");
c3.addEventListener("change", () => hoverAction());