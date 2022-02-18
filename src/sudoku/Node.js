const BLACK_BORDER = "8px solid black";
const GRAY_BORDER = "8px solid DarkGray";

const borderLeft = (row, col) => {
  if (col === 0 || col === 3 || col === 6) {
    return BLACK_BORDER;
  }
  return GRAY_BORDER;
};
const borderRight = (row, col) => {
  if (col === 8) {
    return BLACK_BORDER;
  }
};
const borderTop = (row, col) => {
  if (row === 0 || row === 3 || row === 6) {
    return BLACK_BORDER;
  }

  return GRAY_BORDER;
};
const borderBottom = (row, col) => {
  if (row === 8) {
    return BLACK_BORDER;
  }
};

const Node = ({ row, col, grid }) => {
  let styles = {
    height: "3rem",
    width: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 800,
    fontSize: "2rem",
    borderBottom: borderBottom(row, col),
    borderLeft: borderLeft(row, col),
    borderRight: borderRight(row, col),
    borderTop: borderTop(row, col),
    backgroundColor: "white",
  };

  if (grid[row][col].isFixingMove) {
    styles.backgroundColor = "Coral";
  }
  if (grid[row][col].isNewMove) {
    styles.backgroundColor = "Chartreuse";
  }

  if (grid[row][col].isFixingMove) {
    setTimeout(() => {
      grid[row][col].isFixingMove = false;
    }, 10);
  }
  if (grid[row][col].isNewMove) {
    setTimeout(() => {
      grid[row][col].isNewMove = false;
    }, 10);
  }

  return (
    <span style={{ ...styles }}>
      {grid[row][col].value === 0 ? "" : grid[row][col].value}
    </span>
  );
};

export default Node;
