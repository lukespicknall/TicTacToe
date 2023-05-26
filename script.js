// Player factory function to create new player objects
const Player = (mark, score) => {
  const getMark = () => mark;
  const getScore = () => score;
  return { getMark, getScore };
};

// gameboard module
const gameBoard = (() => {
  const square = document.querySelectorAll('.square');
  const markBox = ['', '', '', '', '', '', '', '', ''];

  // loops over markBox and places the content of each index
  // inside it's sequentially associated square
  const setBoard = () => {
    for (let i = 0; i < markBox.length; i += 1) {
      square[i].textContent = markBox[i];
    }
  };

  // takes param input from game.play to put the mark of
  // the current player on the square that they clicked
  const setMark = (squareId, playerMark) => {
    if (squareId >= '9') return;
    markBox[squareId] = playerMark;
    setBoard();
  };

  // called by game.play.reselClick to clear board and array
  // takes x/oSpots as a/b param to clear store of player occupied squares
  const reset = (a, b) => {
    for (let i = 0; i < markBox.length; i += 1) {
      markBox[i] = '';
    }
    a.splice(0, a.length);
    b.splice(0, b.length);
    setBoard();
  };

  // I want to find a way to not have to return setMark
  // a user can access it in global scope to be devious
  return { setBoard, setMark, reset };
})();

// ** MODULE CONTAINING GAME FLOW FUNCTIONALITY **:
// Player initiation, Get current Player turn, Check if someone won
// Play game (click event to set mark), reser click event
const game = (() => {
  let playerX = Player('X', 0); // pass through factory fucntion to create new players
  let playerO = Player('O', 0);
  let turn = 0;
  let gameOver = false;
  const gameStat = document.querySelector('.game-stat'); // setup some DOM elements
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
      // look through contents of each array element to see if every item
      // in that index in included in the current array content of x/oSpots
      // as soon as one is, that means someone has a winning combo - do stuff
      const xWin = winCombo[i].every((n) => a.includes(n));
      const oWin = winCombo[i].every((n) => b.includes(n));
      if (xWin === true) {
        gameStat.textContent = 'X WINS!';
        gameStat.style.transform = 'none';
        // somehow, creating a new Player each win and incrementing score from old Player object,
        // accesing current score through getPLayerTurn()
        // solving problem of how to update the Player objects score value after win
        // in a way, I don't. I create new ones with the score data I want.
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

  // call Draw
  const callDraw = () => {
    if (turn === 9 && gameOver === false) {
      gameStat.textContent = 'Draw';
      gameStat.style.transform = 'none';
      gameOver = true;
    }
  };

  // listen for click on each game square and add
  // playerMark to square associated with squareID. advance turn count
  const play = (() => {
    const xSpots = [];
    const oSpots = [];
    const square = document.querySelectorAll('.square');
    square.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (turn > 8 || e.target.textContent !== '' || gameOver === true) return;
        gameStat.style.display = 'block';
        gameStat.textContent = '😂';
        // rotate the emoji on each click for fun
        if (turn > 0) gameStat.style.transform = `rotate(${turn * 50}deg)`;
        turn += 1;
        // use click event target.id to know where to put mark
        const squareId = e.target.id;
        // use currentPlayer's inherited getMark() to know what mark to display
        const playerMark = getPlayerTurn().currentPlayer.getMark();
        // use setMark with those values to put mark on square
        // this here is why i had to retuen setMark in the gameboard scope
        gameBoard.setMark(squareId, playerMark);
        // populate the x/oSpot contianer arrays with the squares the players have claimed
        // to give gameboard.checkWinner something to look through for winning combos
        // add a player specific class to the square they claimed
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
      });
    });
    return { xSpots, oSpots, square };
  })();

  // listens to button click and calls reset(), passing x/oSpot arrays.
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
