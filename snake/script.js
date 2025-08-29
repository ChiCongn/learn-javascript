const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BOX = 20; // 20px
const COLS = canvas.width / BOX;
const ROWS = canvas.height / BOX;

ctx.fillStyle = 'red';
ctx.fillRect(0, 0, BOX, BOX);
