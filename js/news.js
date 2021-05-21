(async () => {
    const json = await fetch('/data/newsjson').then(res => res.json());
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
    }

})();