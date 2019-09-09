import React from "react";
import { StyleSheet, View } from "react-native";

import Toolbar from "../../components/Toolbar";
import TilesBar from "../../components/TilesBar";
import Colors from "../../config/colors";
import tiles from "../../config/tiles";
import Canvas from "../../components/Canvas";
import config from "../../config";
import ColorPalette from "../../components/ColorPalette";
import { noAction } from "../../helpers/noAction";
import useCanvas from "../../components/Canvas/useCanvas";
import { useCapture } from "../../components/Canvas/useCapture";

type MainScreenViewProps = {
  screen: { width: string, height: string },
  defaultTile: string,
  defaultTileSize: number,
  currentColor: string,
  currentTile: string,
  setCurrentTile: () => {},
  setCurrentColor: () => {}
};

const MainScreenView = ({
  screen,
  defaultTile,
  defaultTileSize,
  currentColor,
  currentTile,
  setCurrentTile,
  setCurrentColor
}: MainScreenViewProps) => {
  const { width, height } = screen;
  const {
    canvasTiles,
    updateCanvas,
    resetCanvas,
    numCols,
    numRows
  } = useCanvas({
    width,
    height,
    emptySymbol: defaultTile,
    currentTile
  });

  const { captureViewRef, onSaveCapture } = useCapture({ album: "Douat" });

  return (
    <View style={styles.container}>
      <Toolbar reset={resetCanvas} undo={noAction} save={onSaveCapture} />
      <ColorPalette
        colors={config.palette}
        selectedColor={currentColor}
        onSelect={setCurrentColor}
      />
      <View
        style={[styles.canvas, { backgroundColor: currentColor }]}
        ref={captureViewRef}
      >
        <Canvas
          tiles={canvasTiles}
          backgroundColor={currentColor}
          tileSize={defaultTileSize}
          onTilePressed={updateCanvas}
          numCols={numCols}
          numRows={numRows}
        />
      </View>
      <View style={styles.tilesBar}>
        <TilesBar
          tiles={tiles}
          selectedTile={currentTile}
          defaultTile={defaultTile}
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

export default MainScreenView;
