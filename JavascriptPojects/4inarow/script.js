const rows = 6;
const cols = 7;
let currentPlayer = 'red';
const board = document.getElementById('board');

function createBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            board.appendChild(cell);
        }
    }
}

function checkWin() {
    const cells = document.querySelectorAll('.cell');
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(null));

    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const color = cell.classList.contains('red')
            ? 'red'
            : cell.classList.contains('yellow')
            ? 'yellow'
            : null;
        matrix[row][col] = color;
    });

    const directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const color = matrix[r][c];
            if (!color) continue;

            for (const { x, y } of directions) {
                let count = 0;
                for (let i = 0; i < 4; i++) {
                    const newRow = r + i * x;
                    const newCol = c + i * y;
                    if (
                        newRow < 0 ||
                        newRow >= rows ||
                        newCol < 0 ||
                        newCol >= cols ||
                        matrix[newRow][newCol] !== color
                    ) {
                        break;
                    }
                    count++;
                }
                if (count === 4) {
                    alert(`${color} ניצח!`);
                    resetBoard();
                    return;
                }
            }
        }
    }
}

function resetBoard() {
    board.innerHTML = '';
    createBoard();
    currentPlayer = 'red';
}

board.addEventListener('click', e => {
    if (!e.target.classList.contains('cell') || e.target.classList.contains('taken')) return;

    let col = e.target.dataset.col;
    let placed = false;

    for (let r = rows - 1; r >= 0; r--) {
        const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${col}"]`);
        if (!cell.classList.contains('taken')) {
            cell.classList.add('taken', currentPlayer);
            placed = true;
            break;
        }
    }

    if (placed) {
        checkWin();
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    }
});

createBoard();
