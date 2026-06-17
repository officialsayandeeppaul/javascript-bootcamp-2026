const board = document.getElementById("game-board");
const message = document.getElementById("message");

let currentPlayer = "X";

let gameboard = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;

// create the game board
for (let index = 0; index < gameboard.length; index++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-index", index);
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
}

function handleClick(event) {
  const clickedIndex = event.target.getAttribute("data-index");
  console.log("Clicked cell:", clickedIndex);

  if (gameboard[clickedIndex] === "" && gameActive) {
    gameboard[clickedIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
      displayMessage(`${currentPlayer} wins!`);
      gameActive = false;
    } else if (gameboard.every((cell) => cell !== "")) {
      displayMessage(`Match Draw`);
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      //   if
      //   current clicked player X  ?
      //   next turn O
      //   else                      :
      //   current  clicked player O
      //   next turn X
    }
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some((condition) => {
    const [a, b, c] = condition;

    return (
      gameboard[a] !== "" &&
      gameboard[a] === gameboard[b] &&
      gameboard[b] === gameboard[c]
    );
  });
}

function displayMessage(msg) {
  message.textContent = msg;
}
