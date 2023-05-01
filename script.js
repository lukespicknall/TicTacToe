const Player = (mark, score) => {
  const getMark = () => mark;
  const getScore = () => score;
  return { getMark, getScore };
};

// have to call createBoard.markBox to get []
const gameboard = (() => {
  const square = document.querySelectorAll('.square');
  const markBox = ['x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'];

  // loops over markBox and displays each index on each game square
  const setBoard = () => {
    for (let i = 0; i < markBox.length; i += 1) {
      square[i].textContent = markBox[i];
    }
  };

  // use this later to update markBox with playerMarks
  const setMark = (squareId, playerMark) => {
    if (squareId >= '9') return;
    markBox[squareId] = playerMark;
    setBoard();
  };

  // can be called to clear board
  const reset = (() => {
    const resetButton = document.querySelector('.resetBtn');
    resetButton.addEventListener('click', () => {
      for (let i = 0; i < markBox.length; i += 1) {
        markBox[i] = '';
      }
      setBoard();
    });
  })();

  return { setBoard, setMark, reset };
})();

const game = () => {
  const playerX = Player('X', 0);
  const playerO = Player('O', 0);
  let turn = 1
};

// const Player = (mark) => {

// };

// if (markBox.length % 2 === 0

// const playerX = Player('X', 0);
// const playerO = Player('O', 0);
