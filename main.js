// console.log(gameBoard.board);
// const Player = (name, mark) => ({ name, mark });
// const gameBoard = (() => {
//   let board = ["", "", "", "", "", "", "", "", ""];
//   const playerOne = Player("raheem", "X");
//   const playerTwo = Player("sabreen", "O");
//   const btns = document.querySelectorAll(".game .buttons button");
//   const winner = document.querySelector(".game .winner");
//   let i = 0;
//   btns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       if (board[btn.data - index] === "") {
//         if (i++ % 2 === 0) {
//           console.log(e.target, playerOne.mark);
//           e.target.textContent = playerOne.mark;
//           board.splice(btn.className, 1, btn.textContent);
//         } else {
//           console.log(e.target, playerOne.mark);
//           e.target.textContent = playerTwo.mark;
//           board.splice(btn.className, 1, btn.textContent);
//         }
//         // -------------------
//         const winCombos = [
//           [0, 1, 2],
//           [3, 4, 5],
//           [6, 7, 8],
//           [0, 3, 6],
//           [1, 4, 7],
//           [2, 5, 8],
//           [2, 4, 6],
//           [0, 4, 8],
//         ];
// function checkWon() {
//   for (let i = 0; i < winCombos.length; i++) {
//     [a, b, c] = winCombos[i];
//     if (board[a] && board[a] === board[b] && board[b] === board[c]) {
//     }
//   }
// }
//         let res = 0;
//         if (
//           (board[0] !== "") &
//           (board[0] === board[1]) &
//           (board[1] === board[2])
//         ) {
//           res = board[0];
//         }
//         if (
//           (board[3] !== "") &
//           (board[3] === board[4]) &
//           (board[4] === board[5])
//         ) {
//           res = board[3];
//         } else if (
//           (board[6] !== "") &
//           (board[6] === board[7]) &
//           (board[7] === board[8])
//         ) {
//           res = board[6];
//         } else if (
//           (board[0] !== "") &
//           (board[0] === board[3]) &
//           (board[3] === board[6])
//         ) {
//           res = board[0];
//         } else if (
//           (board[1] !== "") &
//           (board[1] === board[4]) &
//           (board[4] === board[7])
//         ) {
//           res = board[1];
//         } else if (
//           (board[2] !== "") &
//           (board[2] === board[5]) &
//           (board[5] === board[8])
//         ) {
//           res = board[2];
//         } else if (
//           (board[0] !== "") &
//           (board[0] === board[4]) &
//           (board[4] === board[8])
//         ) {
//           res = board[0];
//         } else if (
//           (board[2] !== "") &
//           (board[2] === board[4]) &
//           (board[4] === board[6])
//         ) {
//           res = board[2];
//         }
//         if (res !== 0) {
//           finishGame();
//         }
//         function finishGame() {
//           if (playerOne.mark === res) {
//             winner.textContent = `${playerOne.name} won`;
//           } else if (playerTwo.mark === res) {
//             winner.textContent = `${playerTwo.name} won`;
//           }
//           winner.classList.remove("negative-index");
//           board = ["", "", "", "", "", "", "", "", ""];
//           btns.forEach((btn) => {
//             btn.textContent = "";
//           });
//         }
//       }
//     });
//     const rest = document.querySelector(".rest");
//     rest.addEventListener("click", () => {
//       winner.classList.add("negative-index");
//       board = ["", "", "", "", "", "", "", "", ""];
//       btns.forEach((btn) => {
//         btn.textContent = "";
//       });
//     });
//   });
//   return { board, btns };
// })();
//  +1 => 0 , 3 , 6
//  +3 => 0, 1, 2
//  +2 => 2
//  +4 => 0
// wins 0 1 2
//      3 4 5
//      6 7 8
//      0 3 6
//      1 4 7
//      2 5 8
//      0 4 8
//      2 4 6
//  how to know if the player won
// it must be one of those result for the mark x or o

//  how to launch the game and how to close it
const Player = (name, mark) => ({ name, mark });

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const restBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const updateBoard = (index, value) => {
    if (board[index] === "") {
      board[index] = value;
      return true;
    }
    return false;
  };
  const checkWinner = () => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    console.log(board);
    if (!board.includes("")) {
      return "tie";
    }
    return null;
  };
  return { getBoard, restBoard, updateBoard, checkWinner };
})();

const displayController = (() => {
  const playerOne = Player("Player one", "X");
  const playerTwo = Player("Player two", "O");

  const winnerElement = document.querySelector(".winner");
  const gameButtons = document.querySelectorAll(".game .buttons button");
  let currentPlayer = playerOne;
  let gameEnded = false;
  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };
  const buttonHandelOnClick = (e) => {
    if (gameEnded) return;

    let buttonIndex = e.target.getAttribute("data-index");
    if (gameBoard.updateBoard(buttonIndex, currentPlayer.mark)) {
      e.target.textContent = currentPlayer.mark;
      const winner = gameBoard.checkWinner();
      console.log(winner);
      if (winner) {
        handleGameEnd(winner);
      }
      switchPlayer();
    }
  };
  const handleGameEnd = (result) => {
    gameEnded = true;
    if (result === "tie") {
      winnerElement.textContent = "It's a tie!";
    } else {
      winnerElement.textContent = `${currentPlayer.name} Won!`;
    }
    winnerElement.classList.remove("negative-index");
  };
  const handleRestartGame = () => {
    gameEnded = false;
    currentPlayer = playerOne;
    winnerElement.classList.add("negative-index");
    gameBoard.restBoard();

    gameButtons.forEach((button) => {
      button.textContent = "";
    });
  };
  const init = () => {
    gameButtons.forEach((btn) => {
      btn.addEventListener("click", buttonHandelOnClick);
    });
    const restartButton = document.querySelector(".rest");
    restartButton.addEventListener("click", handleRestartGame);
  };
  return { init };
})();
displayController.init();

// if (currentPlayer === playerTwo && playerTwo.name === "computer") {
//   buttonIndex = Math.floor(Math.random() * computerBoard.length);
//   const computerBtn = document.querySelector(
//     `button[data-index="${computerBoard[buttonIndex]}"]`
//   );
//   console.log(computerBoard[buttonIndex]);
//   if (gameBoard.updateBoard(computerBoard[buttonIndex], currentPlayer.mark)) {
//     computerBtn.textContent = currentPlayer.mark;
//     const winner = gameBoard.checkWinner();
//     if (winner) {
//       handleGameEnd(winner);
//     }
//     switchPlayer();
//   }
//   computerBoard.splice(buttonIndex, 1);
// }

// computerBoard = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
