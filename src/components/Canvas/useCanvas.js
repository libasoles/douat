import { useCallback, useState } from "react";
import config from "../../config";
import memoize from "../../helpers/memoization";

const calculateRowsAndCols = memoize(function(width, height) {
  const tileSize = config.tiles.size;
  const numCols = Math.floor(width / tileSize);
  const canvasHeight = height - 200;
  const numRows = Math.floor(canvasHeight / tileSize);

  return { numCols, numRows };
});

const prePopulateCanvas = memoize(function(rows, cols, emptySymbol) {
  const initialCanvas = [];
  const emptyRow = [];
  for (let x = 0; x < rows; x++) {
    emptyRow.push(emptySymbol);
  }
  for (let y = 0; y < cols; y++) {
    initialCanvas.push([...emptyRow]);
  }

  return initialCanvas;
});

export default function useCanvas({
  width,
  height,
  currentTile,
  emptySymbol = " "
}) {
  const { numCols, numRows } = calculateRowsAndCols(width, height);
  const emptyCanvas = prePopulateCanvas(numRows, numCols, emptySymbol);

  const [tiles, updateCanvas] = useState(emptyCanvas);

  const update = useCallback(
    (x, y) => {
      const newCanvasState = [...tiles];
      newCanvasState[x][y] = currentTile;
      updateCanvas(newCanvasState);
    },
    [tiles, currentTile]
  );

  const reset = useCallback(() => {
    updateCanvas(emptyCanvas);
  }, [emptyCanvas]);

  return { canvasTiles: tiles, updateCanvas: update, resetCanvas: reset };
}
