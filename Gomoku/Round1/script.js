
document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 20;
    const gameBoard = document.getElementById('game-board');
    const statusDisplay = document.getElementById('status-display');
    const instructions = document.getElementById('instructions');
    let currentPlayer = 1;
    let gameActive = true;
    let board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));

    function initializeBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const square = document.createElement('div');
                square.dataset.row = i;
                square.dataset.col = j;
                square.addEventListener('click', handleSquareClick);
                gameBoard.appendChild(square);
            }
        }
        board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
        currentPlayer = 1;
        gameActive = true;
        statusDisplay.textContent = "Player 1's Turn";
    }

    function handleSquareClick(event) {
        if (!gameActive) return;
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        if (board[row][col] !== null) return;
        board[row][col] = currentPlayer;
        event.target.classList.add(`player${currentPlayer}`);
        if (checkWin(row, col)) {
            statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
        } else if (board.flat().every(cell => cell !== null)) {
            statusDisplay.textContent = 'Draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWin(row, col) {
        row = parseInt(row);
        col = parseInt(col);
        const directions = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: -1 }
        ];
        for (let { x, y } of directions) {
            let count = 1;
            for (let i = 1; i < 5; i++) {
                if (board[row + i * y] && board[row + i * y][col + i * x] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            for (let i = 1; i < 5; i++) {
                if (board[row - i * y] && board[row - i * y][col - i * x] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }
            if (count >= 5) return true;
        }
        return false;
    }

    document.getElementById('new-game').addEventListener('click', initializeBoard);
    document.getElementById('restart-game').addEventListener('click', initializeBoard);
    document.getElementById('instructions-toggle').addEventListener('click', () => {
        instructions.classList.toggle('hidden');
    });

    initializeBoard();
});
