const Player = (mark, score) => {
  const getMark = () => mark;
  const getScore = () => score;
  return { getMark, getScore };
};

// have to call createBoard.markBox to get []
const gameBoard = (() => {
  const square = document.querySelectorAll('.square');
  const markBox = ['', '', '', '', '', '', '', '', ''];
  const turn = 1;

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

  // can be called to clear board and array and set turn count to 1
  const reset = (() => {
    const resetButton = document.querySelector('.resetBtn');
    resetButton.addEventListener('click', () => {
      for (let i = 0; i < markBox.length; i += 1) {
        markBox[i] = '';
      }
      gameBoard.turn = 1;
      setBoard();
    });
  })();

  return {
    setBoard, setMark, reset, turn,
  };
})();

const game = (() => {
  const playerX = Player('X', 0);
  const playerO = Player('O', 0);

  // determines whose turn it is
  const getPlayerTurn = () => {
    if ((gameBoard.turn % 2) === 0) {
      const currentPlayer = playerX;
      return { currentPlayer };
    }
    const currentPlayer = playerO;
    return { currentPlayer };
  };

  // listen for click on each game square and adds
  // playerMark to square associated with squareID. advances turn count
  const play = (() => {
    const square = document.querySelectorAll('.square');
    square.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (gameBoard.turn > 9 || e.target.textContent !== '') return;
        gameBoard.turn += 1;
        const squareId = e.target.id;
        const playerMark = getPlayerTurn().currentPlayer.getMark();
        gameBoard.setMark(squareId, playerMark);
      });
    });
  })();

  return { getPlayerTurn, play };
})();
