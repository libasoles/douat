import React from "react";
import { StyleSheet, View } from "react-native";
import * as Immutable from "immutable";

import Toolbar from "../../components/Toolbar";
import TilesBar from "../../components/TilesBar";
import Colors from "../../config/colors";
import tiles from "../../config/tiles";
import Canvas from "../../components/Canvas";
import config from "../../config";
import ColorPalette from "../../components/ColorPalette";
import calculateRowsAndCols from "../../services/calculateCanvasDimension";
import { useCapture } from "../../components/Canvas/useCapture";

type MainScreenViewProps = {
  screen: { width: string, height: string },
  defaultTile: string,
  defaultTileSize: number,
  currentColor: string,
  currentTile: string,
  setCurrentTile: () => {},
  setCurrentColor: () => {},
  canvas: Immutable.OrderedMap,
  initCanvas: ({
    numRows: number,
    numCols: number
  }) => {},
  updateCanvas: ({
    x: number,
    y: number,
    tile: string
  }) => {},
  resetCanvas: () => {},
  canUndo: boolean,
  onUndo: () => {}
};

const MainScreenView = ({
  screen,
  defaultTile,
  defaultTileSize,
  currentColor,
  currentTile,
  setCurrentTile,
  setCurrentColor,
  canvas,
  initCanvas,
  updateCanvas,
  resetCanvas,
  onUndo,
  canUndo
}: MainScreenViewProps) => {
  const shouldInitCanvas = canvas.tiles.size === 0;
  if (shouldInitCanvas) {
    const { width, height } = screen;
    const { numCols, numRows } = calculateRowsAndCols(width, height);
    initCanvas({ numRows, numCols });
  }

  const { captureViewRef, onSaveCapture } = useCapture({ album: "Douat" });

  return (
    <View style={styles.container}>
      <Toolbar
        reset={resetCanvas}
        canUndo={canUndo}
        undo={onUndo}
        save={onSaveCapture}
      />
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
          tiles={canvas.tiles}
          backgroundColor={currentColor}
          tileSize={defaultTileSize}
          onTilePressed={updateCanvas}
          numCols={canvas.numCols}
          numRows={canvas.numRows}
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
