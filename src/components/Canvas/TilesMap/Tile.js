import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../../../config/colors";

const defaultColor = Colors.white;
const defaultBackground = Colors.none;

function Tile({
  symbol,
  color = defaultColor,
  backgroundColor = defaultBackground,
  size = 60,
  style
}) {
  const fontSize = size / 0.704;

  return (
    <View style={[styles.tile, { backgroundColor, width: size, height: size }]}>
      <Text
        allowFontScaling={false}
        style={[styles.symbol, { color, ...style, fontSize }]}
      >
        {symbol}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderWidth: 0,
    padding: 0,
    margin: 0
  },
  symbol: {
    fontFamily: "BIT BLOCKS TTF BRK",
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1
  }
});

export default Tile;
