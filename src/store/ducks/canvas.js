import * as Immutable from "immutable";

import { emptyTile } from "../../config/tiles";

type stateType = {
  tiles: Immutable.OrderedMap,
  numRows: number,
  numCols: number,
  zoomLevel: number
};

const initialState: stateType = {
  tiles: Immutable.OrderedMap(),
  numRows: 0,
  numCols: 0,
  zoomLevel: 1
};

function createEmptyCanvas({ numCols, numRows, emptySymbol }) {
  let emptyCanvas = Immutable.OrderedMap();

  for (let x = 0; x < numCols; x++) {
    let row = Immutable.OrderedMap();
    for (let y = 0; y < numRows; y++) {
      row = row.set(y, emptySymbol);
    }
    emptyCanvas = emptyCanvas.set(x, row);
  }

  return emptyCanvas;
}

export default function canvas(state: stateType = initialState, action) {
  switch (action.type) {
    case "INIT_CANVAS":
      const { numRows, numCols, emptySymbol } = action.payload;
      const initialCanvas = createEmptyCanvas({
        numRows,
        numCols,
        emptySymbol
      });

      return {
        ...state,
        tiles: initialCanvas,
        numRows,
        numCols
      };
    case "RESET_CANVAS":
      const emptyCanvas = createEmptyCanvas({
        numRows: state.numRows,
        numCols: state.numCols,
        emptySymbol: action.payload.emptySymbol
      });

      return {
        ...state,
        tiles: emptyCanvas
      };
    case "UPDATE_CANVAS":
      const { x, y, tile } = action.payload;

      const updatedRow = state.tiles.get(x).update(y, () => tile);
      const updatedCanvas = state.tiles.update(x, () => updatedRow);

      return {
        ...state,
        tiles: updatedCanvas
      };
    case "UNDO_UPDATE_CANVAS":
      break;
    default:
      return state;
  }
}

export function initCanvas({ numRows, numCols, emptySymbol = emptyTile }) {
  return {
    type: "INIT_CANVAS",
    payload: {
      numRows,
      numCols,
      emptySymbol
    }
  };
}

export function resetCanvas(emptySymbol = emptyTile) {
  return {
    type: "RESET_CANVAS",
    payload: {
      emptySymbol
    }
  };
}

export function updateCanvas({ x, y }) {
  return (dispatch, getState) => {
    const { app } = getState();

    dispatch({
      type: "UPDATE_CANVAS",
      payload: {
        x,
        y,
        tile: app.currentTile
      }
    });
  };
}
