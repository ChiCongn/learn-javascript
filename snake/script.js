const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BOX = 20; // 20px
const COLS = canvas.width / BOX;
const ROWS = canvas.height / BOX;

ctx.fillStyle = 'red';

let snake = [
  {x: 9 * BOX, y: 9 * BOX},
  {x: 8 * BOX, y: 9 * BOX},
  {x: 7 * BOX, y: 9 * BOX}
];

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'lime' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, BOX, BOX);
  }
}

let food;

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

let direction = "RIGHT";

document.addEventListener('keydown', (e) => {
  const k = e.key;
  if ((k === 'ArrowLeft' || k === 'a') && direction !== 'RIGHT') direction = 'LEFT';
  if ((k === 'ArrowUp'   || k === 'w') && direction !== 'DOWN')  direction = 'UP';
  if ((k === 'ArrowRight'|| k === 'd') && direction !== 'LEFT')  direction = 'RIGHT';
  if ((k === 'ArrowDown' || k === 's') && direction !== 'UP')    direction = 'DOWN';
});


drawSnake();
food = genRandomFood();
drawFood();
//drawBoard();