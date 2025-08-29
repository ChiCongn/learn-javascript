const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BOX = 20; // 20px
const COLS = canvas.width / BOX;
const ROWS = canvas.height / BOX;

ctx.fillStyle = 'red';
ctx.fillRect(0, 0, BOX, BOX);

let snake = [
  {x: 9 * BOX, y: 9 * BOX},
  {x: 8 * BOX, y: 9 * BOX},
  {x: 7 * BOX, y: 9 * BOX}
];

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'lime' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, BOX, BOX);
  }
}

drawSnake();