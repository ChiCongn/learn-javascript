const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BOX = 20; // 20px
const COLS = canvas.width / BOX;
const ROWS = canvas.height / BOX;

const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

let isOver;
let snake, direction, food, gameInterval, speed, score;

function initGame() {
  snake = [
    { x: 9 * BOX, y: 10 * BOX },
    { x: 8 * BOX, y: 10 * BOX },
    { x: 7 * BOX, y: 10 * BOX }
  ];
  direction = 'RIGHT';
  isOver = false;
  food = genRandomFood();
  score = 0;
  speed = 200;
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, speed);
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'lime' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, BOX, BOX);
  }
}

function genRandomFood() {
  let randomX, randomY;
  
  do {
    randomX = Math.floor(Math.random() * COLS) * BOX;
    randomY = Math.floor(Math.random() * ROWS) * BOX;
  } while (snake && snake.some(seg => seg.x === randomX && seg.y === randomY));

  return {x: randomX, y: randomY};
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, BOX, BOX);
}

document.addEventListener('keydown', (e) => {
  const k = e.key;
  if ((k === 'ArrowLeft' || k === 'a') && direction !== 'RIGHT') direction = 'LEFT';
  if ((k === 'ArrowUp'   || k === 'w') && direction !== 'DOWN')  direction = 'UP';
  if ((k === 'ArrowRight'|| k === 'd') && direction !== 'LEFT')  direction = 'RIGHT';
  if ((k === 'ArrowDown' || k === 's') && direction !== 'UP')    direction = 'DOWN';
});

function collision(head, body) {
  return body.some(seg => seg.x === head.x && seg.y === head.y) || head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height;
}

function gameLoop() {
  drawBoard();
  drawSnake();
  drawFood();

  const head = {x: snake[0].x, y: snake[0].y};
  if (direction === 'LEFT')  head.x -= BOX;
  if (direction === 'RIGHT') head.x += BOX;
  if (direction === 'UP')    head.y -= BOX;
  if (direction === 'DOWN')  head.y += BOX;

  if (collision(head, snake)) {
    clearInterval(gameInterval);
    gameInterval = null;
    console.log("Game Over!");
    isOver = true;
    return;
  }

  const willEat = head.x === food.x && head.y === food.y;

  if (willEat) {
    food = genRandomFood();
    score++;
    scoreEl.textContent = 'Score: ' + score;
    // increase speed
    if (score % 5 === 0 && speed > 55) {
      speed -= 10;
      console.log('speedup')
      clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, speed);
    }
  } else {
    snake.pop(); // drop tail
  }
  
  snake.unshift(head); //add new head to front
}

startBtn.addEventListener('click', () => {
  initGame();
});

pauseBtn.addEventListener('click', () => {
  if (isOver) return;
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
    pauseBtn.textContent = 'Resume';
    console.log('resume');
  } else {
    gameInterval = setInterval(gameLoop, speed);
    pauseBtn.textContent = 'Pause';
    console.log('pause');
  }
});