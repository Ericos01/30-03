
const gmailInput = document.getElementById('gmail_input')
const gmailButton = document.getElementById('gmail_button')
const gmailResult = document.getElementById('gmail_result');

const regExp = /^[a-zA-Z0-9._-]+@gmail.com$/;
gmailButton.addEventListener('click', () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'SUCCESS'
         gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'ERROR'
         gmailResult.style.color = 'red'
    }
})

const canvas = document.querySelector(".gameCanvas");
const ctx = canvas.getContext("2d");
const scoreBlock = document.querySelector(".score");

const snake = {
    x: 10,
    y: 10,
    dx: 0,
    dy: 0,
    cells:[{x: 10, y: 10}],
    maxCells:4,
    score:0
}
const food = {
    x: 0,
    y: 0,
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function update(){
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) snake.x = canvas.width - 10;
    if (snake.y < 0) snake.x = canvas.height - 10;

    if (snake.x >= canvas.width) snake.x = 0;
    if (snake.y >= canvas.height) snake.y = 0;

    snake.cells.unshift({
        x: snake.x,
        y: snake.y,
    })

    if (snake.cells.length > snake.maxCells) snake.cells.pop();
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lime';

    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, 10, 10);
        if (cell.x === food.x && cell.y === food.y){
            snake.maxCells++;
            food.x = getRandomInt(0, canvas.width / 10-1) * 10;
            food.x = getRandomInt(0, canvas.height / 10-1) * 10;
            updateScore()
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                defaultState();
            }
        }
    })

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}
function defaultState(){
    snake.x = 10;
    snake.y = 10;
    snake.cells = [{x: 10, y:10}];
    snake.maxCells = 4;
    snake.dx = 10;
    snake.dy = 0;
    snake.score = 0;
    food.x = getRandomInt(0, canvas.width / 10 - 1) * 10;
    food.y = getRandomInt(0, canvas.height / 10 - 1) * 10;

    updateScore();
}

function updateScore(){
    snake.score++;
    scoreBlock.textContent = snake.score;
}
function gameLoop(){
    update()
    draw()
    setTimeout(gameLoop, 70)
}
document.addEventListener("keydown",(event) => {
    switch (event.key) {
        case "w":
        case "W":
        case "ц":
        case "Ц":
            if (snake.dy !== 10) {
                snake.dx = 0;
                snake.dy = -10;
            }
            break;

        case "s":
        case "S":
        case "ы":
        case "Ы":
            if (snake.dy !== -10) {
                snake.dx = 0;
                snake.dy = 10;
            }
            break;

        case "a":
        case "A":
        case "ф":
        case "Ф":
            if (snake.dx !== 10) {
                snake.dx = -10;
                snake.dy = 0;
            }
            break;

        case "d":
        case "D":
        case "в":
        case "В":
            if (snake.dx !== -10) {
                snake.dx = 10;
                snake.dy = 0;
            }
            break;
    }
})
gameLoop()

 const parentWidth = 499;
 const parentHeight = 499;
 let positionX = Math.floor(Math.random() * parentWidth);let positionY = Math.floor(Math.random() * parentHeight);
 let deltaX = Math.random() * 10 - 1;
 let deltaY = Math.random() * 10 - 1;
const moveBlock = () => {    if (positionX < 0 || positionX > parentWidth) {
     deltaX = -deltaX;    }
     if (positionY < 4 || positionY > parentHeight) {
         deltaY = -deltaY;    }
     positionX += deltaX;
     positionY += deltaY;
     document.querySelector('.child_block').style.left = `${positionX}px`;    document.querySelector('.child_block').style.top = `${positionY}px`;
     setTimeout(moveBlock, 15);
 };
 moveBlock();




const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const startButton = document.getElementById("startTimer");
const stopButton = document.getElementById("stopTimer");
const resetButton = document.getElementById("resetTimer");
const breakButton = document.getElementById("breakButton");

let seconds = 0;
let milliseconds = 0;
let minutes = 0;
let intervalId;
let isRunning = false;

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
breakButton.addEventListener("click", takeBreak);

function startTimer() {
    if (!isRunning) {
        intervalId = setInterval(updateTimer, 10);
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = true;
        breakButton.disabled = false;
        isRunning = true;
    }
}
function stopTimer() {
    if (!isRunning) {
        clearInterval(intervalId);
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
        breakButton.disabled = false;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(intervalId);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateTimerDisplay();
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    breakButton.disabled = false;
    isRunning = false;
}

function takeBreak() {
    if (isRunning) {
        stopTimer();
        setTimeout(startTimer, 5000);
    }
}

function updateTimer() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
    millisecondsElement.textContent = milliseconds < 100 ? `0${Math.floor(milliseconds / 10)}` : Math.floor(milliseconds / 10);
}