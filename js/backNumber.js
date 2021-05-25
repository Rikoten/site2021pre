const labelName = {
  "重要": "important",
  "参加団体": "participants",
  "協賛": "sponsor"
};

(async () => {
  const json = await fetch("/data/news.json").then(res => res.json()).then(res => res.reverse());
  let id = json.length - 1;

  const ul = document.querySelector(".news ul");
  const html = [];
  for(const data of json) {
    html.push(`
      <li>
        <a href = "/news/news/?id=${id--}">
          <span class = "date">${data.date}</span>
          <div>
            <span class = "label ${labelName[data.label]}">${data.label}</span>
          </div>
          <span class = "title">${data.head}</span>
        </a>
      </li>
    `)
  }

  ul.innerHTML = html.join("");
})();