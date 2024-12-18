const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initBoard() {
    gameBoard.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    });
    updateStatus();
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        statusDisplay.textContent = ` ${currentPlayer} השחקן ניצח`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        statusDisplay.textContent = 'תיקו';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function checkWin() {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}

function updateStatus() {
    statusDisplay.textContent = `${currentPlayer} התור של`;
}

resetButton.addEventListener('click', () => {
    board.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    initBoard();
});

initBoard();
