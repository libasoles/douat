import React from "react";
import { connect } from "react-redux";

import { setCurrentColor, setCurrentTile } from "../store/ducks/app";
import { initCanvas, resetCanvas, updateCanvas } from "../store/ducks/canvas";
import MainScreenView from "./MainScreen/MainScreenView";

function mapStateToProps({ app, canvas }) {
  return {
    screen: app.screen,
    defaultTile: app.defaultTile,
    defaultTileSize: app.defaultTileSize,
    currentColor: app.currentColor,
    currentTile: app.currentTile,
    canvas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentColor: color => dispatch(setCurrentColor(color)),
    setCurrentTile: tile => dispatch(setCurrentTile(tile)),
    initCanvas: params => dispatch(initCanvas(params)),
    updateCanvas: params => dispatch(updateCanvas(params)),
    resetCanvas: () => dispatch(resetCanvas())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenView);
