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
  const gameOver = false;

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
  // and clear store of player occupied squares x/oSpots
  const reset = (a, b) => {
    for (let i = 0; i < markBox.length; i += 1) {
      markBox[i] = '';
    }
    a.splice(0, a.length);
    b.splice(0, b.length);
    gameBoard.turn = 1;
    gameBoard.gameOver = false;
    setBoard();
  };

  return {
    setBoard, setMark, reset, turn, gameOver,
    // checkWinner,
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

  // takes 2 params x/oSpots and checks if every element in each winCombo item
  // matches the current contents of either x/oSpot array
  // if it does, do stuff
  const checkWinner = (a, b) => {
    const gameStat = document.querySelector('.game-stat');
    const winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winCombo.length; i += 1) {
      const xWin = winCombo[i].every((n) => a.includes(n));
      const oWin = winCombo[i].every((n) => b.includes(n));
      if (xWin === true) {
        gameStat.textContent = 'xwins';
        gameBoard.gameOver = true;
      } if (oWin === true) {
        gameStat.textContent = 'owins';
        gameBoard.gameOver = true;
        // gameOver = true;
      }
    }
  };

  // listen for click on each game square and adds
  // playerMark to square associated with squareID. advances turn count
  const play = (() => {
    const xSpots = [];
    const oSpots = [];
    const square = document.querySelectorAll('.square');
    square.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (gameBoard.turn > 9 || e.target.textContent !== '' || gameBoard.gameOver === true) return;
        gameBoard.turn += 1;
        const squareId = e.target.id;
        const playerMark = getPlayerTurn().currentPlayer.getMark();
        gameBoard.setMark(squareId, playerMark);
        // another way to get index #s into arrays to check for winner.
        // use this or gameboard checkWinner function
        if (playerMark === 'X') xSpots.push(parseInt(squareId, 10)); // the 10 is radix# and just means base 10
        if (playerMark === 'O') oSpots.push(parseInt(squareId, 10));
        checkWinner(xSpots, oSpots);
      });
    });
    return { xSpots, oSpots };
  })();

  // listens to button click and calls reset(), passing x.oSpot arrays.
  const resetClick = (() => {
    const resetButton = document.querySelector('.resetBtn');
    resetButton.addEventListener('click', () => {
      gameBoard.reset(play.xSpots, play.oSpots);
    });
  })();

  return {
    getPlayerTurn, play, checkWinner, resetClick,
  };
})();
