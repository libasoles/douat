import React from "react";
import { StyleSheet, View } from "react-native";

import Tile from "./Tile";
import { noAction } from "../helpers/noAction";
import ZoomView from "../services/ZoomView";

function Canvas({
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
        {tiles.map((row, i) => {
          return (
            <View key={i}>
              {row.map((seal, j) => {
                return (
                  <Tile
                    key={j}
                    symbol={seal}
                    color={frontColor}
                    onSelect={() => onPress(i, j)}
                    size={tileSize}
                  />
                );
              })}
            </View>
          );
        })}
      </ZoomView>
    </View>
  );
}

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
