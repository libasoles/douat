import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Toolbar from "../components/Toolbar";
import TilesBar from "../components/TilesBar";
import Colors from "../config/colors";
import tiles from "../config/tiles";
import Canvas from "../components/Canvas";
import config from "../config";
import ColorPalette from "../components/ColorPalette";
import useCanvas from "../components/Canvas/useCanvas";
import { noAction } from "../helpers/noAction";
import { useCapture } from "../components/Canvas/useCapture";

function getDefaultColor() {
  return config.palette[0];
}

function getDefaultTile() {
  return " ";
}

function getDefaultTileSize() {
  return config.tiles.size;
}

const MainScreen = () => {
  const defaultTile = getDefaultTile();
  const defaultColor = getDefaultColor();
  const [currentTile, setCurrentTile] = useState(defaultTile);
  const [currentColor, selectColor] = useState(defaultColor);

  const tileSize = getDefaultTileSize();
  const { width, height } = Dimensions.get("window");
  const {
    canvasTiles,
    updateCanvas,
    resetCanvas,
    numCols,
    numRows
  } = useCanvas({
    width,
    height,
    emptySymbol: getDefaultTile(),
    currentTile
  });

  const { captureViewRef, onSaveCapture } = useCapture({ album: "Douat" });

  return (
    <View style={styles.container}>
      <Toolbar
        reset={resetCanvas}
        undo={noAction}
        save={onSaveCapture}
        share={noAction}
      />
      <ColorPalette
        colors={config.palette}
        selectedColor={currentColor}
        onSelect={selectColor}
      />
      <View
        style={[styles.canvas, { backgroundColor: currentColor }]}
        ref={captureViewRef}
      >
        <Canvas
          tiles={canvasTiles}
          backgroundColor={currentColor}
          tileSize={tileSize}
          onTilePressed={updateCanvas}
          numCols={numCols}
          numRows={numRows}
        />
      </View>
      <View style={styles.tilesBar}>
        <TilesBar
          tiles={tiles}
          selectedTile={currentTile}
          onSelect={setCurrentTile}
          currentTileBackground={currentColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Colors.dark,
    padding: 2,
    fontSize: 20
  },
  canvas: {
    flex: 1
  },
  tilesBar: {
    marginTop: 4
  }
});

export default MainScreen;
