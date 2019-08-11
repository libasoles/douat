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
  style,
  onSelect = noAction
}) {
  const action = useCallback(() => onSelect(symbol), [onSelect, symbol]);

  return (
    <TouchableOpacity onPress={action} underlayColor="white">
      <Text style={[styles.tile, { color, backgroundColor, ...style }]}>
        {symbol}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    fontFamily: "BIT BLOCKS TTF BRK",
    fontSize: 60,
    borderWidth: 0,
    padding: 0,
    margin: 0
  }
});

export default Tile;
