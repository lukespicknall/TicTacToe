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
  const reset = (a, b) => {
    for (let i = 0; i < markBox.length; i += 1) {
      markBox[i] = '';
    }
    a.splice(0, a.length);
    b.splice(0, b.length);
    gameBoard.turn = 1;
    setBoard();
  };

  // const resetClick = (() => {
  //   const resetButton = document.querySelector('.resetBtn');
  //   resetButton.addEventListener('click', () => {
  //     reset(a, b);
  //   });
  // })();

  // checks markBox for mark and creates new array with each mark instance's index
  // frankly i dont quite understand this array manipulation . . .

  // const checkWinner = () => {
  //   const xChecker = markBox.map((mark, idx) => (mark === 'X' ? idx : '')).filter(String);
  //   console.log(xChecker);
  //   const oChecker = markBox.map((mark, idx) => (mark === 'O' ? idx : '')).filter(String);
  //   console.log(oChecker);
  // another approach . . . .
  // const checker = markBox.filter((mark) => mark.includes('X'));
  // console.log(checker);
  // return { checker };
  // };

  return {
    setBoard, setMark, reset, turn,
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

  const checkWinner = (a, b) => {
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
        alert('x wins');
        gameBoard.reset(a, b);
        return;
      } if (oWin === true) {
        alert('o wins');
        gameBoard.reset(a, b);
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
        if (gameBoard.turn > 9 || e.target.textContent !== '') return;
        gameBoard.turn += 1;
        const squareId = e.target.id;
        const playerMark = getPlayerTurn().currentPlayer.getMark();
        gameBoard.setMark(squareId, playerMark);
        // gameBoard.checkWinner();

        // another way to get index #s into arrays to check for winner.
        // use this or gameboard checkWinner function
        if (playerMark === 'X') xSpots.push(parseInt(squareId, 10)); // the 10 is radix# and just means base 10
        if (playerMark === 'O') oSpots.push(parseInt(squareId, 10));
        checkWinner(xSpots, oSpots);
      });
    });
    return { xSpots, oSpots };
  })();

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
