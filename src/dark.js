var icon =document.getElementById("moon");
const iconMain = document.querySelector(".bx-grid-alt")
const menu = document.querySelector('.navMenu')
var header = document.querySelector('.header')

icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.classList.toggle('bx-sun')
    }else{
        icon.classList.toggle('bx-sun')
    }
}

iconMain.addEventListener('click', function () 
{
    menu.classList.toggle('menuShow')
})
console.log(menu);

iconMain.addEventListener('click',function()
{
    iconMain.classList.toggle('bxs-x-circle')
})

window.addEventListener("scroll",function(){
    header.classList.toggle("mainScroll",window.scrollY>0)
})
console.log(header);