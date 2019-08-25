import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { noAction } from "../helpers/noAction";
import ZoomView from "../services/ZoomView";
import TilesMap from "./Canvas/TilesMap";
import Drawable from "./Canvas/Drawable";

const Canvas = function Canvas({
  tiles = [],
  backgroundColor,
  tileSize,
  onTilePressed = noAction,
  numCols,
  numRows
}) {
  const onDrag = useCallback(
    ({ posX, posY, scale }) => {
      const x = Math.floor(posX / tileSize);
      const y = Math.floor((posY - 110) / tileSize);

      const isWithinBoundingBox =
        x >= 0 && y >= 0 && x < numCols && y < numRows;
      if (isWithinBoundingBox) onTilePressed(x, y);
    },
    [tileSize, onTilePressed, numCols, numRows]
  );

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ZoomView
        style={styles.canvas}
        defaultScale={1}
        minScale={1}
        maxScale={4}
      >
        {({ scale }) => (
          <Drawable
            style={styles.canvas}
            onDrag={position => onDrag({ ...position, scale })}
          >
            <TilesMap tiles={tiles} tileSize={tileSize} />
          </Drawable>
        )}
      </ZoomView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  canvas: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Canvas;
