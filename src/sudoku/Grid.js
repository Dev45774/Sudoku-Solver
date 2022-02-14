import Node from "./Node";
import "./Grid.css";

const Grid = ({ grid }) => {
  return (
    <div>
      {grid.map((row, r) => (
        <div key={r} className="row">
          {" "}
          {row.map((col, c) => (
            <Node key={c} row={r} col={c} grid={grid} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
