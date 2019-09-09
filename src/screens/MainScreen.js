import React from "react";
import { connect } from "react-redux";

import { setCurrentColor, setCurrentTile } from "../store/ducks/app";
import MainScreenView from "./MainScreen/MainScreenView";

function mapStateToProps({ app }) {
  return {
    screen: app.screen,
    defaultTile: app.defaultTile,
    defaultTileSize: app.defaultTileSize,
    currentColor: app.currentColor,
    currentTile: app.currentTile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentColor: color => dispatch(setCurrentColor(color)),
    setCurrentTile: tile => dispatch(setCurrentTile(tile))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenView);
