import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import Toolbar from "./components/Toolbar";
import TilesBar from "./components/TilesBar";
import Colors from "./config/colors";
import tiles from "./config/tiles";
import Canvas from "./components/Canvas";
import config from "./config";
import ColorPalette from "./components/ColorPalette";
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

  return (
    <View style={styles.container}>
      <Toolbar
        reset={noAction}
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
        <Canvas backgroundColor={currentColor} frontColor={Colors.white} />
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
