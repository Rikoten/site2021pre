const body = document.querySelector("body");

const hoverAction = () => {
  const elems = [];

  const headerTop = document.querySelector("header .header-top");
  const desc = document.querySelector("header .desc");
  const h2 = document.querySelector("h2");
  const h3 = document.querySelectorAll("h3");

  elems.push({"item": headerTop, "name": "サムネイル＋企画名"});
  elems.push({"item": desc, "name": "企画紹介文"});
  elems.push({"item": h2, "name": "大見出し"});
  elems.push({"item": h3[0], "name": "小見出し"});
  elems.push({"item": h3[1], "name": "小見出し"});

  const hoverDiv = document.querySelectorAll(".hover-div");
  if(hoverDiv) {
    for(const div of hoverDiv) div.remove();
  }

  for(const elem of elems) {
    const top = elem.item.getBoundingClientRect().top;
    const height = elem.item.getBoundingClientRect().height;
    body.insertAdjacentHTML("beforeend", `<div class = "hover-div" style = "height: ${height+20}px; top: ${top-10}px;"><div>${elem.name}</div></div>`);
  }
}

window.addEventListener("resize", () => hoverAction());