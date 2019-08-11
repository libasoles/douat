import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { noAction } from "../../helpers/noAction";
import Colors from "../../config/colors";

const defaultBorderColor = "rgba(0,0,0,0.2)";

function Color({
  color,
  selected = false,
  icon = null,
  onColorChange = noAction
}) {
  const borderColor = selected ? "#fcfcfc" : defaultBorderColor;

  return (
    <TouchableOpacity
      onPress={() => onColorChange(color)}
      style={[styles.color, { backgroundColor: color, borderColor }]}
    >
      {selected && (
        <Text
          style={{ color: Colors.white, fontSize: 20 }}
          adjustsFontSizeToFit
        >
          {icon}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  color: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25
  }
});

export default Color;
