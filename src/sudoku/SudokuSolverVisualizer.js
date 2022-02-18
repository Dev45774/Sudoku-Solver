import { useEffect, useState } from "react";
import Grid from "./Grid";
import {
  runSudokuSolver,
  initialBoardWithObjects,
  initialBoard,
} from "./sudoku";

const SudokuSolverVisualizer = () => {
  const [timeouts, setTimeouts] = useState([]);
  const [grid, setGrid] = useState([]);
  const [solvingSpeed, setSolvingSpeed] = useState(4);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setGrid(initialBoardWithObjects);
  }, []);
  useEffect(() => {
    // starts animation after button is pressed
    if (startAnimation) {
      animateSudokuSolver();
      setStartAnimation(false);
    }
  }, [grid]);

  const resetGrid = () => {
    setGrid(
      initialBoard.map((row) =>
        row.map((col) => ({
          value: col,
        }))
      )
    );
  };

  const animateSudokuSolver = () => {
    const { initialBoard, changesInOrder } = runSudokuSolver();
    setGrid(initialBoard);
    for (let i = 0; i < changesInOrder.length; i++) {
      // timeout to animate each change to the board
      const newtimeOut = setTimeout(() => {
        console.log(changesInOrder[i].num);
        const newGrid = grid.slice();
        if (newGrid[changesInOrder[i].row][changesInOrder[i].col].value) {
          newGrid[changesInOrder[i].row][
            changesInOrder[i].col
          ].isFixingMove = true;
        } else {
          newGrid[changesInOrder[i].row][
            changesInOrder[i].col
          ].isNewMove = true;
        }
        newGrid[changesInOrder[i].row][changesInOrder[i].col].value =
          changesInOrder[i].num;
        setGrid(newGrid);
      }, i * solvingSpeed);

      setTimeouts((timeouts) => [...timeouts, newtimeOut]);
    }

    // update last color changes to columns
    const newtimeOut = setTimeout(() => {
      setGrid((grid) =>
        grid.map((row) =>
          row.map((col) => ({ ...col, isNewMove: false, isFixingMove: false }))
        )
      );
    }, changesInOrder.length * solvingSpeed + 100);
    setTimeouts((timeouts) => [...timeouts, newtimeOut]);
  };

  return (
    <div className="sudokusolver-container">
      <div>{grid && <Grid grid={grid} />}</div>
      <div style={{ marginTop: "1rem" }}>
        <a
          className="sudoku-btn"
          onClick={async () => {
            timeouts.forEach((timeout) => {
              clearTimeout(timeout);
            });
            setTimeouts([]);
            resetGrid();
            setStartAnimation(true);
          }}
        >
          Solve
        </a>
        <a
          className="sudoku-btn"
          onClick={() => {
            timeouts.forEach((timeout) => {
              clearTimeout(timeout);
            });
            setTimeouts([]);

            resetGrid();
          }}
        >
          Reset
        </a>
        <select
          style={{
            padding: "1rem",
            fontSize: "2rem",
            border: "3px solid #f97316",
          }}
          onChange={(event) => {
            setSolvingSpeed(event.target.value);
          }}
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" disabled>
            Select Speed
          </option>
          <option value={4}>Very Fast</option>
          <option value={20}>Fast</option>
          <option value={50}>Normal</option>
          <option value={200}>Slow</option>
        </select>
      </div>
    </div>
  );
};

export default SudokuSolverVisualizer;
