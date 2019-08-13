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

function getDefaultTileSize() {
  return config.tiles.size;
}

const App = () => {
  const defaultColor = getDefaultColor();
  const defaultTile = getDefaultTile();
  const [currentColor, selectColor] = useState(defaultColor);
  const [currentTile, selectTile] = useState(defaultTile);

  const tileSize = getDefaultTileSize();
  const { width, height } = Dimensions.get("window");
  const { canvasTiles, updateCanvas, resetCanvas } = useCanvas({
    width,
    height,
    currentTile,
    emptySymbol: getDefaultTile()
  });

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
          onPress={updateCanvas}
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
