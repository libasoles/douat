import React from "react";
import { StyleSheet, View } from "react-native";

import { noAction } from "../helpers/noAction";
import ZoomView from "../services/ZoomView";
import TilesMap from "./Canvas/TilesMap";

function areEqual(prevProps, nextProps) {
  const tilesAreEqual = Object.is(prevProps.tiles, nextProps.tiles);
  const backgroundColorIsEqual =
    prevProps.backgroundColor === nextProps.backgroundColor;
  const frontColorIsEqual =
    prevProps.backgroundColor === nextProps.backgroundColor;

  return tilesAreEqual && backgroundColorIsEqual && frontColorIsEqual;
}

const Canvas = React.memo(function Canvas({
  tiles = [],
  backgroundColor,
  frontColor,
  tileSize,
  onPress = noAction
}) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ZoomView
        style={styles.canvas}
        defaultScale={1}
        minScale={1}
        maxScale={4}
      >
        <TilesMap
          tiles={tiles}
          frontColor={frontColor}
          tileSize={tileSize}
          onPress={onPress}
        />
      </ZoomView>
    </View>
  );
},
areEqual);

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
