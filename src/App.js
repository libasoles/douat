import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Toolbar from "./components/Toolbar";
import TilesBar from "./components/TilesBar";
import Colors from "./config/colors";
import tiles from "./config/tiles";
import Canvas from "./components/Canvas";
import config from "./config";
import ColorPalette from "./components/ColorPalette";
import useCanvas from "./components/Canvas/useCanvas";
import { noAction } from "./helpers/noAction";

function getDefaultColor() {
  return config.palette[0];
}

function getDefaultTile() {
  return tiles[0];
}

const App = () => {
  const defaultColor = getDefaultColor();
  const defaultTile = getDefaultTile();
  const [currentColor, selectColor] = useState(defaultColor);
  const [currentTile, selectTile] = useState(defaultTile);

  const tileSize = 40;
  const numCols = Dimensions.get("window").width / tileSize;
  const canvasHeight = Dimensions.get("window").height - 200;
  const numRows = canvasHeight / tileSize;
  const [canvasTiles, updateCanvas, resetCanvas] = useCanvas(numRows, numCols);

  const addToCanvas = useCallback((x, y) => updateCanvas(x, y, currentTile), [
    currentTile,
    updateCanvas
  ]);

  return (
    <View style={styles.container}>
      <Toolbar
        reset={resetCanvas}
        undo={noAction}
        download={noAction}
        share={noAction}
      />
      <ColorPalette
        colors={config.palette}
        selectedColor={currentColor}
        onSelect={selectColor}
      />
      <View style={styles.canvas}>
        <Canvas
          tiles={canvasTiles}
          backgroundColor={currentColor}
          frontColor={Colors.white}
          tileSize={tileSize}
          onPress={addToCanvas}
        />
      </View>
      <View style={styles.tilesBar}>
        <TilesBar
          tiles={tiles}
          selectedTile={currentTile}
          onSelect={selectTile}
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

export default App;
