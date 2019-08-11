import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { noAction } from "../helpers/noAction";
import Colors from "../config/colors";

function IconButton({
  name,
  size = 25,
  color = Colors.light,
  action = noAction
}) {
  return (
    <TouchableOpacity onPress={action} style={styles.icon}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10
  }
});

export default IconButton;
