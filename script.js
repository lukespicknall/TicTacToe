const gameBox = document.querySelector('#game-box');
// function ipsy() {
//   gameBox.style.border = '5px solid red';
// }
// ipsy();

// const gameBoard = ["", "", "", "", "", "", "", "", ""];

// console.log(gameBoard)

const createBoard = (() => { 
  const gameBoard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
  for (let i = 0; i < gameBoard.length; i++) {
    const spot = document.createElement('div');
    spot.textContent(gameBoard[i]);
    gameBox.appendChild(spot);
    // console.log('hi')
  }
  gameBox.style.border = "5px solid red";
//   gameBox.innerHTML(gameBoard);
//   return { gameDisplay };
// console.log(gameBoard);
})();
