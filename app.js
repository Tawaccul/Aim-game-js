const btn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#8F32DB' , '#68DB48', '#3D3EDB', '#FFE573', '#DB27B9', '#DDFF00']
let time = 0;
let score = 0;

btn.addEventListener('click', (event) => {
   event.preventDefault();
   screens[0].classList.add('up');
})


timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')){
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up');
    startGame();
    }
})

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
        score++;
        event.target.remove();
        createRandom();
    }
} )


function startGame(){
    setInterval(decreaseTime, 1000)
    setTime(time);
    createRandom();
}

function decreaseTime() {
    if(time === 0 ){
       finishGame();
    }else{
        let current = --time;
        if(current < 10) {
           current = `0${current}`
        }
        setTime(current);
   }
 }

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame(){
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h2>Ваш счет: <span class="primary">${score}</span></h2>`
}

function createRandom(){
    const circle = document.createElement('div');
    const size = getRandom(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandom(0, width - size);
    const y = getRandom(0, height - size);
    const setColors = getRandomColor();
    circle.classList.add('circle');
    circle.style.background = `${setColors}`
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle);
}

function getRandom(min, max) { 
   return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}