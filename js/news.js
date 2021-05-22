(async () => {
    const json = await fetch('/data/news.json').then(res => res.json());
    const title = document.querySelector(".title");
    const date = document.querySelector(".date");
    const label = document.querySelector(".name");
    const sentence = document.querySelector("p");

    for(const data of json){
        title.textContent=data.head;
        date.textContent=data.date;
        label.textContent=data.label;
        const h = data.contents.length;
        var all='';
        for(let i=0; i < h; i++){
            all += data.contents[i]+"\n";
        }
        sentence.innerHTML = all.replace(/\n/g, '<br>');
        link_title.textContent = data.link_t;
        let stocklist = [];
        for(let i = 0; i < data.link.length; i++){
            console.log(data.link[i].name);
            console.log(data.link[i].url);
            /*stocklist += '<li><a href="data.link[i].url">'+ data.link[i].name + '</a></li>';*/
            stocklist.push(`
                <li>
                    <a href="${data.link[i].url}">${data.link[i].name}</a>
                </li>
            `);
        }
        document.getElementById('link_list').innerHTML = stocklist.join("");
    }

})();