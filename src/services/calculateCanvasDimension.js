import config from "../config";
import memoize from "../helpers/memoization";

const calculateRowsAndCols = memoize(function(width, height) {
  const tileSize = config.tiles.size;
  const numCols = Math.floor(width / tileSize);
  const canvasHeight = height - 200; // tmp number. TODO: calculate real space
  const numRows = Math.floor(canvasHeight / tileSize);

  return { numCols, numRows };
});

export default calculateRowsAndCols;
