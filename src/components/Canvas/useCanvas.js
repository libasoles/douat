import { useCallback, useState } from "react";
import * as Immutable from "immutable";

import config from "../../config";
import memoize from "../../helpers/memoization";

const calculateRowsAndCols = memoize(function(width, height) {
  const tileSize = config.tiles.size;
  const numCols = Math.floor(width / tileSize);
  const canvasHeight = height - 200; // tmp number. TODO: calculate real space
  const numRows = Math.floor(canvasHeight / tileSize);

  return { numCols, numRows };
});

const prePopulateCanvas = memoize(function(
  numRows,
  numCols,
  emptySymbol
): Immutable.OrderedMap {
  let initialCanvas = Immutable.OrderedMap();

  for (let x = 0; x < numCols; x++) {
    let row = Immutable.OrderedMap();
    for (let y = 0; y < numRows; y++) {
      row = row.set(y, emptySymbol);
    }
    initialCanvas = initialCanvas.set(x, row);
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
      const newRowState = tiles.get(x).update(y, () => currentTile);
      const newCanvasState = tiles.update(x, () => newRowState);
      updateCanvas(newCanvasState);
    },
    [tiles, currentTile]
  );

  const reset = useCallback(() => {
    updateCanvas(emptyCanvas);
  }, [emptyCanvas]);

  return {
    canvasTiles: tiles,
    updateCanvas: update,
    resetCanvas: reset,
    numCols,
    numRows
  };
}
