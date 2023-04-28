const gameBox = document.querySelector('#game-box');

// have to call createBoard.markConatiner to get []
const createBoard = (() => {
  const markContainer = ['x', 'o', 'x', 'o', 'x', 'o', 'x'];
  const gameBoard = document.createElement('div');
  gameBoard.className = 'game-board';
  for (let i = 0; i < markContainer.length; i += 1) {
    const square = document.createElement('div');
    square.id = i;
    square.className = 'game-square';
    square.textContent = markContainer[i];
    gameBoard.appendChild(square);
  }
  gameBox.appendChild(gameBoard);
  gameBox.style.border = 'solid 5px red';
  return { markContainer };
})();

// const Player = (mark) => {

// };


// if (markContainer.length % 2 === 0

