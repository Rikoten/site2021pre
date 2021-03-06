const labelName = {
    "重要": "important",
    "参加団体": "participants",
    "協賛": "sponsor"
  };

(async () => {
    const json = await fetch('/data/news.json').then(res => res.json());
    const title = document.querySelector(".title");
    const date = document.querySelector(".date");
    const label = document.querySelector(".label");
    const sentence = document.querySelector(".all p");
    const link_title = document.querySelector("h2");
    const link_name = document.querySelector("li");
    /*const link = document.querySelector("a");*/
    /*var ul = document.getElementById('link_list');*/

    const id = location.search.split("=")[1];
    const data = json[id];

    title.textContent=data.head;
    date.textContent=data.date;
    label.textContent=data.label;
    label.classList.add(labelName[data.label]);
    var all='';
    for(let i=0; i < data.contents.length; i++){
        all += data.contents[i]+"<br>";
    }
    sentence.innerHTML = all;
    link_title.textContent = data.link_t;
    let stocklist = [];
    for(let i = 0; i < data.link.length; i++){
        /*console.log(data.link[i].name);
        console.log(data.link[i].url);*/
        stocklist.push(`
            <li>
                <a href="${data.link[i].url}">${data.link[i].name}</a>
            </li>
        `);
    }
    document.getElementById('link_list').innerHTML = stocklist.join("");

    const topicPath = document.querySelector(".topic-path ol");
    topicPath.insertAdjacentHTML("beforeend", `<li><a href = "/news/news/?id=${id}">${data.head}</a></li>`)
})();