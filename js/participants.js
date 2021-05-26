const scheduleLi = document.querySelectorAll(".table>ul>div");
const scheduleMenu = document.querySelectorAll(".table>.title-wrapper>div")

for(const div of scheduleMenu){
    div.addEventListener("click", () =>{
        const index = [].slice.call(scheduleMenu).indexOf(div);
        const activediv = document.querySelectorAll(".table .title-wrapper .active");
        const activediv2 = document.querySelectorAll(".table>ul>.active");

        for(const active of activediv){
            active.classList.remove("active");
        }

        for(const active of activediv2){
            active.classList.remove("active");
        }

        div.classList.add("active");
        scheduleLi[index].classList.add("active");
        console.log(scheduleLi[index]);
    });



}