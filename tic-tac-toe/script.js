const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const turn = document.getElementById('turn');

const dialog = document.getElementById('winnerDialog');
const winnerMessage = document.getElementById('winnerMessage');
const closeDialog = document.getElementById('closeDialog');

const board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;

cells.forEach(cell => cell.addEventListener('click', markCell));
resetBtn.addEventListener('click', resetGame);
closeDialog.addEventListener('click', () => {
    dialog.classList.add('hidden');
});

function markCell(e) {
    const index = e.target.dataset.index;

    if (isGameOver || board[index]) return; // game over or already filled

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        showWinner(currentPlayer);
        isGameOver = true;
        return;
    }

    if (chekcDraw()) {
        showDraw();
        isGameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //switch player
    turn.textContent = `${currentPlayer} turn`;
}

function checkWin(currentPlayer) {
    const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
    ];

    return winPatterns.some(pattern => pattern.every(i => board[i] === currentPlayer));
}

function chekcDraw() {
    return board.every(cell => cell);
}

function showWinner(player) {
    winnerMessage.textContent = `🎉 Player ${player} wins! 🎉`;
    dialog.classList.remove('hidden');
    statusEl.textContent = `Game Over - Player ${player} wins!`;
}

function showDraw() {
    winnerMessage.textContent = "😐 It's a draw!";
    dialog.classList.remove('hidden');
    statusEl.textContent = "Game Over - Draw!";
}

function resetGame(){
    isGameOver = false;
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}