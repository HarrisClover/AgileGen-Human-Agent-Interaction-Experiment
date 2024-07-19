
const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const newGameBtn = document.getElementById('newGameBtn');
const restartGameBtn = document.getElementById('restartGameBtn');
const undoMoveBtn = document.getElementById('undoMoveBtn');

let board = [];
let currentPlayer = 'black';
let moveHistory = [];

function initializeBoard() {
    board = Array(20).fill(null).map(() => Array(20).fill(null));
    gameBoard.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            const cell = document.createElement('div');
            cell.addEventListener('click', () => placeStone(i, j));
            gameBoard.appendChild(cell);
        }
    }
    updateGameStatus();
}

function placeStone(row, col) {
    if (board[row][col]) return;
    board[row][col] = currentPlayer;
    moveHistory.push({ row, col, player: currentPlayer });
    updateBoard();
    if (checkWin(row, col)) {
        gameStatus.textContent = `${currentPlayer === 'black' ? 'Player 1' : 'Player 2'} wins!`;
        disableBoard();
    } else if (moveHistory.length === 400) {
        gameStatus.textContent = 'Game is a draw!';
    } else {
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        updateGameStatus();
    }
}

function updateBoard() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            const cell = gameBoard.children[i * 20 + j];
            cell.className = board[i][j];
        }
    }
}

function updateGameStatus() {
    gameStatus.textContent = `${currentPlayer === 'black' ? "Player 1's turn" : "Player 2's turn"}`;
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || checkDirection(row, col, 0, 1) || checkDirection(row, col, 1, 1) || checkDirection(row, col, 1, -1);
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    for (let i = 1; i < 5; i++) {
        if (board[row + i * rowDir]?.[col + i * colDir] === currentPlayer) count++;
        else break;
    }
    for (let i = 1; i < 5; i++) {
        if (board[row - i * rowDir]?.[col - i * colDir] === currentPlayer) count++;
        else break;
    }
    return count >= 5;
}

function disableBoard() {
    for (const cell of gameBoard.children) {
        cell.style.pointerEvents = 'none';
    }
}

newGameBtn.addEventListener('click', initializeBoard);
restartGameBtn.addEventListener('click', initializeBoard);
undoMoveBtn.addEventListener('click', () => {
    if (moveHistory.length === 0) return;
    const lastMove = moveHistory.pop();
    board[lastMove.row][lastMove.col] = null;
    currentPlayer = lastMove.player;
    updateBoard();
    updateGameStatus();
});

initializeBoard();
