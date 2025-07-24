const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");
let playAgainstAI = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (playAgainstAI && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  const cell = document.querySelector(`.cell[data-index='${index}']`);
  cell.textContent = player;
}

function checkWin(player) {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === player);
  });
}

function restartGame() {
  gameActive = true;
  gameState = Array(9).fill("");
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

function toggleAI() {
  playAgainstAI = document.getElementById("aiToggle").checked;
  restartGame();
}

function aiMove() {
  for (let i = 0; i < 9; i++) {
    if (gameState[i] === "") {
      makeMove(i, "O");
      if (checkWin("O")) {
        statusText.textContent = "Player O wins!";
        gameActive = false;
        return;
      }
      if (gameState.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
      currentPlayer = "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
      return;
    }
  }
}

// Initialize game
createBoard();
