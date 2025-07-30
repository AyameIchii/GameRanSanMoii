const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'RIGHT';
let food = randomFood();
let score = 0;
let speed = 200; // bắt đầu chậm

let gameInterval;

// DOM
const menu = document.querySelector('.menu');
const gameOverScreen = document.querySelector('.game-over');
const leaderboardScreen = document.querySelector('.leaderboard');

document.getElementById('startBtn').onclick = () => {
  menu.style.display = 'none';
  startGame();
};
document.getElementById('leaderboardBtn').onclick = showLeaderboard;
document.getElementById('saveScoreBtn').onclick = saveScore;
document.getElementById('restartBtn').onclick = startGame;
document.getElementById('backBtn').onclick = () => {
  gameOverScreen.style.display = 'none';
  menu.style.display = 'block';
};
document.getElementById('backFromLeaderboard').onclick = () => {
  leaderboardScreen.style.display = 'none';
  menu.style.display = 'block';
};

document.addEventListener('keydown', event => {
  const key = event.key;
  if (key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  else if (key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'lime' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === 'LEFT') headX -= box;
  if (direction === 'UP') headY -= box;
  if (direction === 'RIGHT') headX += box;
  if (direction === 'DOWN') headY += box;

  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width || headY >= canvas.height ||
    collision({ x: headX, y: headY }, snake)
  ) {
    endGame();
    return;
  }

  let newHead = { x: headX, y: headY };
  snake.unshift(newHead);

  if (headX === food.x && headY === food.y) {
    score++;
    food = randomFood();

    // Tăng tốc độ theo điểm số (mỗi 5 điểm giảm 15ms, min = 50ms)
    const newSpeed = 200 - Math.floor(score / 5) * 15;
    if (newSpeed < speed && newSpeed >= 50) {
      clearInterval(gameInterval);
      speed = newSpeed;
      gameInterval = setInterval(draw, speed);
    }
  } else {
    snake.pop();
  }

  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Điểm: ' + score, 10, 20);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

function startGame() {
  gameOverScreen.style.display = 'none';
  leaderboardScreen.style.display = 'none';
  canvas.style.display = 'block';
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = 'RIGHT';
  food = randomFood();
  score = 0;
  speed = 200;
  clearInterval(gameInterval);
  gameInterval = setInterval(draw, speed);
}

function endGame() {
  clearInterval(gameInterval);
  document.getElementById('final-score').textContent = `Điểm của bạn: ${score}`;
  canvas.style.display = 'none';
  gameOverScreen.style.display = 'block';
}

async function saveScore() {
  const name = document.getElementById('player-name').value.trim();
  if (!name) return alert('Nhập tên trước khi lưu');

  const res = await fetch('/api/save-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score })
  });

  if (res.ok) {
    alert('✅ Đã lưu!');
    showLeaderboard();
  } else {
    alert('❌ Không thể lưu điểm');
  }
}

async function showLeaderboard() {
  leaderboardScreen.style.display = 'block';
  menu.style.display = 'none';
  gameOverScreen.style.display = 'none';

  const res = await fetch('/api/get-leaderboard');
  const list = await res.json();
  const ul = document.getElementById('leaderboard-list');
  ul.innerHTML = '';
  list.forEach(({ name, score }, idx) => {
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${name}: ${score}`;
    ul.appendChild(li);
  });
}
