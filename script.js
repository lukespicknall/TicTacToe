const Player = (mark, score) => {
  const getMark = () => mark;
  const getScore = () => score;
  return { getMark, getScore };
};

// have to call createBoard.markBox to get []
const gameboard = (() => {
  const square = document.querySelectorAll('.square');
  const markBox = ['x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'];

  const setBoard = (() => {
    for (let i = 0; i < markBox.length; i += 1) {
      square[i].textContent = markBox[i];
    }
  });

  // use this later to update markBox with playerMarks
  const setMark = ((squareId, playerMark) => {
    markBox[squareId] = playerMark;
    setBoard();
  });
  return { setBoard, setMark, markBox };
})();

// const Player = (mark) => {

// };

// if (markBox.length % 2 === 0

// const playerX = Player('X', 0);
// const playerO = Player('O', 0);
