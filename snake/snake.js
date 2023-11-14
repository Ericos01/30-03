const canvas = document.querySelector(".gameCanvas");
const ctx = canvas.getContext("2d");
const scoreBlock =document.querySelector(".score");

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
    setTimeout(gameLoop, 50)
}
document.addEventListener("keydown",(e) =>
{
    switch (e.key) {
        case "w":
        case "W":
            if (snake.dy !== 10) {
                snake.dx = 0;
                snake.dy = -10;
            }
            break;

        case "s":
        case "S":
            if (snake.dy !== -10) {
                snake.dx = 0;
                snake.dy = 10;
            }
            break;

        case "a":
        case "A":
            if (snake.dx !== 10) {
                snake.dx = -10;
                snake.dy = 0;
            }
            break;

        case "d":
        case "D":
            if (snake.dx !== -10) {
                snake.dx = 10;
                snake.dy = 0;
            }
            break;
    }
})

gameLoop()