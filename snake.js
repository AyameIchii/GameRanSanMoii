const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{x: 200, y: 200}];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;
let interval;
let gameRunning = false;

function startGame() {
  document.querySelector(".menu").style.display = "none";
  canvas.style.display = "block";
  snake = [{x: 200, y: 200}];
  direction = "RIGHT";
  score = 0;
  food = spawnFood();
  gameRunning = true;
  interval = setInterval(gameLoop, 100);
}

function gameLoop() {
  let head = {...snake[0]};
  switch (direction) {
    case "LEFT": head.x -= 20; break;
    case "RIGHT": head.x += 20; break;
    case "UP": head.y -= 20; break;
    case "DOWN": head.y += 20; break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = spawnFood();
  } else {
    snake.pop();
  }

  if (checkCollision(head)) {
    gameOver();
    return;
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 400, 400);

  ctx.fillStyle = "green";
  snake.forEach(part => ctx.fillRect(part.x, part.y, 20, 20));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 20, 20);
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20
  };
}

function checkCollision(head) {
  return (
    head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 ||
    snake.slice(1).some(p => p.x === head.x && p.y === head.y)
  );
}

document.addEventListener("keydown", e => {
  if (!gameRunning) return;
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function gameOver() {
  clearInterval(interval);
  gameRunning = false;
  canvas.style.display = "none";
  document.querySelector(".game-over").style.display = "block";
  document.getElementById("final-score").textContent = `Điểm: ${score}`;
}

function saveScore() {
  const name = document.getElementById("player-name").value || "Không tên";
  const entry = `${name} - ${score}`;
  let list = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  list.push(entry);
  list = list.slice(-10);
  localStorage.setItem("leaderboard", JSON.stringify(list));
  backToMenu();
}

function restartGame() {
  document.querySelector(".game-over").style.display = "none";
  startGame();
}

function showLeaderboard() {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".leaderboard").style.display = "block";
  const list = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  const ul = document.getElementById("leaderboard-list");
  ul.innerHTML = "";
  list.reverse().forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    ul.appendChild(li);
  });
}

function backToMenu() {
  document.querySelector(".menu").style.display = "block";
  document.querySelector(".leaderboard").style.display = "none";
  document.querySelector(".game-over").style.display = "none";
}
