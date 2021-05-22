(async () => {
    const json = await fetch('/data/notice.json').then(res => res.json());
    const title = document.querySelector(".title");
    const date = document.querySelector(".date");
    const label = document.querySelector(".name");
    const sentence = document.querySelector("p");
    const link_title = document.querySelector("h2");
    const link_name = document.querySelector("li");
    /*const link = document.querySelector("a");*/
    var ul = document.getElementById('link_list');

    for(const data of json){
        title.textContent=data.head;
        date.textContent=data.date;
        label.textContent=data.label;
        var all='';
        for(let i=0; i < data.contents.length; i++){
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