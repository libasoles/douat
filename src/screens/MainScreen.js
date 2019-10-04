import React from "react";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";

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
    canvas: canvas.present,
    canUndo: canvas.past.length > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentColor: color => dispatch(setCurrentColor(color)),
    setCurrentTile: tile => dispatch(setCurrentTile(tile)),
    initCanvas: params => dispatch(initCanvas(params)),
    updateCanvas: params => dispatch(updateCanvas(params)),
    resetCanvas: () => dispatch(resetCanvas()),
    onUndo: () => dispatch(UndoActionCreators.undo())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenView);
