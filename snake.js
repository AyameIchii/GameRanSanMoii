const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameOverMessage = document.getElementById("gameOverMessage");
const finalScore = document.getElementById("finalScore");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

const box = 10;
let snake;
let direction;
let food;
let score;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

function initGame() {
    snake = [{ x: 5 * box, y: 5 * box }];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
    score = 0;
    scoreDisplay.innerText = "Điểm: " + score;
    gameOverMessage.style.display = "none";
    clearInterval(game);
    game = setInterval(draw, 100);
}

document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.fillStyle = "#50B3E3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "black" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "green";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
        score++;
        scoreDisplay.innerText = "Điểm: " + score;
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        finalScore.innerText = score;
        gameOverMessage.style.display = "block"; // Hiển thị thông báo Game Over
    }

    snake.unshift(newHead);
}

restartButton.addEventListener("click", initGame);

initGame();
const game = setInterval(draw, 100);
