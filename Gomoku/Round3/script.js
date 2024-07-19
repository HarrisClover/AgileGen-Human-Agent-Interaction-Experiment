document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 20;
    const board = [];
    let currentPlayer = "black";
    let gameActive = true;

    const gameBoard = document.getElementById("game-board");
    const currentTurnDisplay = document.getElementById("current-turn");
    const gameResultDisplay = document.getElementById("game-result");
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeModalBtn = document.querySelector(".close-btn");

    function initializeBoard() {
        gameBoard.innerHTML = "";
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                square.dataset.row = i;
                square.dataset.col = j;
                square.addEventListener("click", handleSquareClick);
                board[i][j] = null;
                gameBoard.appendChild(square);
            }
        }
        currentPlayer = "black";
        gameActive = true;
        currentTurnDisplay.textContent = "Current Turn: Player 1";
        gameResultDisplay.textContent = "";
    }

    function handleSquareClick(event) {
        if (!gameActive) return;

        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (board[row][col] !== null) return;

        board[row][col] = currentPlayer;
        event.target.classList.add(currentPlayer);
        event.target.classList.toggle("clicked");

        if (checkWin(row, col)) {
            gameActive = false;
            gameResultDisplay.textContent = `Player ${currentPlayer === "black" ? 1 : 2} wins!`;
        } else if (board.flat().every(cell => cell !== null)) {
            gameActive = false;
            gameResultDisplay.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "black" ? "white" : "black";
            currentTurnDisplay.textContent = `Current Turn: Player ${currentPlayer === "black" ? 1 : 2}`;
        }
    }

    function checkWin(row, col) {
        return checkDirection(row, col, 1, 0) || // Horizontal
               checkDirection(row, col, 0, 1) || // Vertical
               checkDirection(row, col, 1, 1) || // Diagonal \
               checkDirection(row, col, 1, -1);  // Diagonal /
    }

    function checkDirection(row, col, rowDir, colDir) {
        let count = 1;
        let r = parseInt(row);
        let c = parseInt(col);

        for (let i = 1; i < 5; i++) {
            r += rowDir;
            c += colDir;
            if (r < 0 || r >= boardSize || c < 0 || c >= boardSize || board[r][c] !== currentPlayer) break;
            count++;
        }

        r = parseInt(row);
        c = parseInt(col);

        for (let i = 1; i < 5; i++) {
            r -= rowDir;
            c -= colDir;
            if (r < 0 || r >= boardSize || c < 0 || c >= boardSize || board[r][c] !== currentPlayer) break;
            count++;
        }

        return count >= 5;
    }

    document.getElementById("new-game").addEventListener("click", initializeBoard);
    document.getElementById("restart-game").addEventListener("click", initializeBoard);

    document.getElementById("rules").addEventListener("click", () => {
        modalBody.innerHTML = "<h2>Rules</h2><p>Gomoku is a board game where two players take turns placing black and white stones on a 20x20 grid. The objective is to be the first to get an unbroken row of five stones horizontally, vertically, or diagonally.</p>";
        modal.style.display = "block";
    });

    document.getElementById("about").addEventListener("click", () => {
        modalBody.innerHTML = "<h2>About</h2><p>Gomoku, also known as Five in a Row, is a traditional board game that originated in Japan. It is a simple yet strategic game that has been enjoyed for centuries.</p>";
        modal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    initializeBoard();
});
