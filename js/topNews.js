const labelName = {
  "重要": "important",
  "参加団体": "participants",
  "協賛": "sponsor"
};

const latestNews = {
  date: document.querySelector(".latest-news .date"),
  label: document.querySelector(".latest-news .label"),
  title: document.querySelector(".latest-news .title")
};

(async () => {
  const json = await fetch("/data/news.json").then(res => res.json()).then(res => res.reverse());
  const latest = json[0];
  let id = json.length - 1;

  latestNews.date.textContent = latest.date;
  latestNews.title.textContent = latest.head;
  latestNews.label.textContent = latest.label;
  latestNews.label.classList.add(labelName[latest.label]);
  document.querySelector(".latest-news a:first-of-type").setAttribute("href", `/news/news/?id=${id}`);

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