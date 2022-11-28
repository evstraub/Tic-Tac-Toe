const playerX = "x";
const playerO = "circle";
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById("winningMessageText");
let isPlayerOTurn = false;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  isPlayerOTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(playerX);
    cell.classList.remove(playerO);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}
function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isPlayerOTurn ? playerO : playerX;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    winningMessageTextElement.innerText = `player with ${
      isPlayerOTurn ? "o's" : "x's"
    } wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(playerX) || cell.classList.contains(playerO);
  });
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isPlayerOTurn = !isPlayerOTurn;
}
function setBoardHoverClass() {
  boardElement.classList.remove(playerX);
  boardElement.classList.remove(playerO);
  if (isPlayerOTurn) {
    boardElement.classList.add(playerO);
  } else {
    boardElement.classList.add(playerX);
  }
}
function checkWin(currentClass) {
  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
