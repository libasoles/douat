import { combineReducers } from "redux";

import app from "./ducks/app";
import canvas from "./ducks/canvas";
import tilesBar from "./ducks/tilesBar";

export default combineReducers({
  app,
  canvas,
  tilesBar
});
