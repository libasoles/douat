import config from "../../config";
import { Dimensions } from "react-native";

const defaultColor = config.palette[0];
const defaultTile = " ";
const { width, height } = Dimensions.get("window");

const initialState = {
  colors: [],
  defaultTile: defaultTile,
  defaultTileSize: config.tiles.size,
  currentColor: defaultColor,
  currentTile: defaultTile,
  screen: {
    width,
    height
  }
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_COLOR":
      return {
        ...state,
        currentColor: action.payload.color
      };
    case "SET_SELECTED_TILE":
      return {
        ...state,
        currentTile: action.payload.tile
      };
    case "SET_ZOOM_LEVEL":
      break;
    default:
      return state;
  }
}

function setCurrentColor(color) {
  return {
    type: "SET_SELECTED_COLOR",
    payload: {
      color
    }
  };
}

function setCurrentTile(tile) {
  return {
    type: "SET_SELECTED_TILE",
    payload: {
      tile
    }
  };
}

export { setCurrentColor, setCurrentTile };
