import {signin} from './chat-api';

let spriteList = []

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }


    let inputElement = document.getElementById("input");
    inputElement.onkeydown = (event) => {
        let x = inputElement.offsetLeft
        let y = inputElement.offsetTop
        spriteList.push(new Piece(x, y));
        console.log(spriteList)
        tick();
    }


    let menu = document.getElementById("menu");
    menu.onmouseover = (event) => {
        menu.style.transform = 'scale(1.02)';
    }
    menu.onmouseout = (event) => {
        menu.style.transform = 'scale(1)';
    }
    menu.onclick = (event) => {
        tick();
    }
});


const tick = () => { 
    for (let i = 0; i < spriteList.length; i++) {
        spriteList[i].tick();
    }
    window.requestAnimationFrame(tick);
}