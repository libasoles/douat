import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { noAction } from "../helpers/noAction";

function IconButton({ name, action = noAction }) {
  return (
    <TouchableOpacity onPress={action} style={styles.icon}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10
  }
});

export default IconButton;
