import { useState } from "react";

export default function useCanvas(rows = 10, cols = 10, emptySymbol = " ") {
  const initialCanvas = [];
  const emptyRow = [];
  for (let x = 0; x < rows; x++) {
    emptyRow.push(emptySymbol);
  }
  for (let y = 0; y < cols; y++) {
    initialCanvas.push([...emptyRow]);
  }

  const [tiles, updateCanvas] = useState(initialCanvas);

  const update = (x, y, selectedTile) => {
    const newTile = [...tiles];

    newTile[x][y] = selectedTile;
    updateCanvas(newTile);
  };

  const reset = () => {
    updateCanvas(initialCanvas);
  };

  return [tiles, update, reset];
}
