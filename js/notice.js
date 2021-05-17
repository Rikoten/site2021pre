(async () => {
    const json = await fetch('/data/notice.json').then(res => res.json());
    const title = document.querySelector(".title");
    const date = document.querySelector(".date")

    for(const data of json){
        console.log(data);
        title.textContent=data.head;
        date.textConten=data.date;
    }

})();