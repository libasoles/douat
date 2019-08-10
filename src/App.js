import React from "react";
import { StyleSheet, View } from "react-native";

import Toolbar from "./components/Toolbar";
import TilesBar from "./components/TilesBar";
import Colors from "./config/colors";
import tiles from "./config/tiles";
import Canvas from "./components/Canvas";
import config from "./config";
import ColorPalette from "./components/ColorPalette";

const App = () => {
  let currentColor = Colors.black;
  let selectedTile = " ";

  return (
    <View style={styles.container}>
      <Toolbar />
      <ColorPalette
        colors={config.palette}
        selectedColor={currentColor}
        onSelect={() => {}}
      />
      <View style={styles.canvas}>
        <Canvas backgroundColor={currentColor} frontColor={Colors.white} />
      </View>
      <View style={styles.tilesBar}>
        <TilesBar
          onSelect={() => {}}
          currentTileBackground={currentColor}
          tiles={tiles}
          selectedTile={selectedTile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: 20,
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
