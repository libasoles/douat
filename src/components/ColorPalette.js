import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Color from "./ColorPalette/Color";
import { noAction } from "../helpers/noAction";

const defaultColors = [
  "#C0392B",
  "#E74C3C",
  "#9B59B6",
  "#8E44AD",
  "#2980B9",
  "#3498DB",
  "#1ABC9C",
  "#16A085",
  "#27AE60",
  "#2ECC71",
  "#F1C40F",
  "#F39C12",
  "#E67E22",
  "#D35400",
  "#ffffff",
  "#BDC3C7",
  "#95A5A6",
  "#7F8C8D",
  "#34495E",
  "#2C3E50",
  "#000000"
];

function ColorPalette({
  colors = defaultColors,
  selectedColor,
  icon = "✔",
  onSelect = noAction
}) {
  return (
    <View style={[styles.colorContainer]}>
      <ScrollView horizontal={true}>
        {colors.map(color => (
          <Color
            key={color}
            color={color}
            selected={selectedColor === color}
            onColorChange={onSelect}
            icon={icon}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ColorPalette;
