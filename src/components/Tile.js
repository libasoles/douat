import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { noAction } from "../helpers/noAction";
import Colors from "../config/colors";

const defaultColor = Colors.white;
const defaultBackground = Colors.none;

function Tile({
  symbol,
  isSelected = false,
  color = defaultColor,
  bgColor = defaultBackground,
  separation,
  onSelect = noAction
}) {
  const action = useCallback(() => onSelect(symbol), [onSelect, symbol]);

  const backgroundColor = isSelected ? bgColor : defaultBackground;

  return (
    <TouchableOpacity onPress={action} underlayColor="white">
      <Text style={[styles.tile, { color, backgroundColor, ...separation }]}>
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
