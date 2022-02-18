import SudokuSolverVisualizer from "./sudoku/SudokuSolverVisualizer";
import "./App.css";

function App() {
  return (
    <>
      <div className="header">
        <h1>Sudoku Solver</h1>
      </div>
      <div className="main">
        <SudokuSolverVisualizer />
      </div>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default App;
