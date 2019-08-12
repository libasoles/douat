import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { noAction } from "../helpers/noAction";
import Colors from "../config/colors";

const defaultColor = Colors.white;
const defaultBackground = Colors.none;

function Tile({
  symbol,
  color = defaultColor,
  backgroundColor = defaultBackground,
  size = 60,
  style,
  onSelect = noAction
}) {
  const action = useCallback(() => onSelect(symbol), [onSelect, symbol]);

  const fontSize = size / 0.72;
  return (
    <TouchableOpacity
      onPress={action}
      underlayColor="white"
      style={[styles.tile, { backgroundColor, width: size, height: size }]}
    >
      <Text
        allowFontScaling={false}
        style={[styles.symbol, { color, ...style, fontSize }]}
      >
        {symbol}
      </Text>
    </TouchableOpacity>
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
