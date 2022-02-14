let board = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];
export const initialBoard = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];

let changesInOrder = [];

const isSafe = ({ board, row, col, num }) => {
  // Return false if horizontal row already has the number
  for (let c = 0; c < board.length; c++) {
    if (board[row][c] == num) {
      return false;
    }
  }

  // Return false if vertical row already has the number
  for (let r = 0; r < board.length; r++) {
    if (board[r][col] == num) {
      return false;
    }
  }

  let boxRowStart = row - (row % 3);
  let boxColStart = col - (col % 3);

  // check if box contains the number
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (board[r][c] == num) {
        return false;
      }
    }
  }

  return true;
};

const solveSudoku = () => {
  //get next empty column
  let row = null;
  let col = null;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        row = r;
        col = c;
      }
    }
  }
  const noEmptyColsFound = row === null;
  if (noEmptyColsFound) {
    return true;
  }

  // backtracking
  for (let n = 1; n <= 9; n++) {
    if (isSafe({ board, row, col, num: n })) {
      board[row][col] = n;
      changesInOrder.push({ row, col, num: n });

      if (solveSudoku(board)) {
        return true;
      } else {
        board[row][col] = 0;
      }
    }
  }

  return false;
};

export const initialBoardWithObjects = initialBoard.map((row) =>
  row.map((col) => ({
    value: col,
  }))
);

export const runSudokuSolver = () => {
  solveSudoku(board);
  return {
    changesInOrder,
    initialBoard: initialBoardWithObjects,
  };
};
