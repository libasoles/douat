import React from "react";
import { StyleSheet, View } from "react-native";

import Tile from "./Tile";
import { noAction } from "../helpers/noAction";

function Canvas({
  tiles = [],
  backgroundColor,
  onPress = noAction,
  frontColor
}) {
  return (
    <View style={[styles.canvas, { backgroundColor: backgroundColor }]}>
      {tiles.map((column, i) => {
        return (
          <View key={i}>
            {column.map((seal, j) => {
              return (
                <Tile
                  key={j}
                  symbol={seal}
                  color={frontColor}
                  onSelect={() => onPress(i, j)}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default Canvas;
