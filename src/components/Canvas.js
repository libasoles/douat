import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { noAction } from "../helpers/noAction";
import ZoomView from "../services/ZoomView";
import TilesMap from "./Canvas/TilesMap";

const Canvas = function Canvas({
  tiles = [],
  backgroundColor,
  frontColor,
  tileSize,
  onTilePressed = noAction
}) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ZoomView
        style={[styles.canvas, {}]}
        defaultScale={1}
        minScale={1}
        maxScale={4}
      >
        <TilesMap
          tiles={tiles}
          frontColor={frontColor}
          tileSize={tileSize}
          onPress={onTilePressed}
        />
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
