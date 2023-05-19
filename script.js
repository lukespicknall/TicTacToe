const Player = (mark, score) => {
  const getMark = () => mark;
  const getScore = () => score;
  return { getMark, getScore };
};

// have to call createBoard.markBox to get []
const gameBoard = (() => {
  const square = document.querySelectorAll('.square');
  const markBox = ['', '', '', '', '', '', '', '', ''];

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
    setBoard();
  };

  return { setBoard, setMark, reset };
})();

// ** MODULE CONTAINING GAME FLOW FUNCTIONALITY **:
// Player initiation, Get current Turn, Check if someone won
// Play game (click event to set mark), reser click event
const game = (() => {
  let playerX = Player('X', 0);
  let playerO = Player('O', 0);
  let turn = 0;
  let gameOver = false;
  const gameStat = document.querySelector('.game-stat');
  const xScore = document.getElementById('x-score');
  const oScore = document.getElementById('o-score');

  // determines whose turn it is
  const getPlayerTurn = () => {
    if ((turn % 2) !== 0) {
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
        gameStat.textContent = 'X WINS!';
        gameStat.style.transform = 'none';
        // somehow, creating a new Player each win and incrementing score,
        // accesing current score through getPLayerTurn()
        playerX = Player('X', game.getPlayerTurn().currentPlayer.getScore() + 1);
        xScore.textContent = getPlayerTurn().currentPlayer.getScore();
        gameOver = true;
      } if (oWin === true) {
        gameStat.textContent = 'O WINS!';
        gameStat.style.transform = 'none';
        playerO = Player('O', game.getPlayerTurn().currentPlayer.getScore() + 1);
        oScore.textContent = getPlayerTurn().currentPlayer.getScore();
        gameOver = true;
      }
    }
  };

  const callDraw = () => {
    if (turn === 9 && gameOver === false) {
      gameStat.textContent = 'Draw';
      gameStat.style.transform = 'none';
      gameOver = true;
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
        if (turn > 8 || e.target.textContent !== '' || gameOver === true) return;
        gameStat.style.display = 'block';
        gameStat.textContent = '😂';
        // if (turn === 1) gameStat.style.transform = 'rotate(90deg)';
        if (turn > 0) gameStat.style.transform = `rotate(${turn * 50}deg)`;
        turn += 1;
        const squareId = e.target.id;
        const playerMark = getPlayerTurn().currentPlayer.getMark();
        gameBoard.setMark(squareId, playerMark);
        // another way to get index #s into arrays to check for winner.
        // use this or gameboard checkWinner function
        if (playerMark === 'X') {
          xSpots.push(parseInt(squareId, 10));
          item.classList.add('x-square');
        } // the 10 is radix# and just means base 10
        if (playerMark === 'O') {
          oSpots.push(parseInt(squareId, 10));
          item.classList.add('o-square');
        }
        checkWinner(xSpots, oSpots);
        callDraw();
        // eslint-disable-next-line quotes
      });
    });
    return { xSpots, oSpots, square };
  })();

  // listens to button click and calls reset(), passing x.oSpot arrays.
  const resetClick = (() => {
    const resetButton = document.querySelector('.resetBtn');
    const square = document.querySelectorAll('.square');
    resetButton.addEventListener('click', () => {
      gameBoard.reset(play.xSpots, play.oSpots);
      gameStat.style.transform = 'none';
      gameStat.textContent = 'X GOES FIRST';
      turn = 0;
      gameOver = false;
      square.forEach((item) => {
        item.classList.remove('x-square');
        item.classList.remove('o-square');
      });
    });
  })();

  return { getPlayerTurn, resetClick };
})();
