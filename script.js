const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      return boardState[a];
    }
  }
  return boardState.includes(null) ? null : 'Draw';
};

const handleCellClick = (e) => {
  const index = e.target.getAttribute('data-index');

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();

  if (winner) {
    message.textContent = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  boardState = Array(9).fill(null);
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
