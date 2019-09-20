import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../config/colors";
import { noAction } from "../helpers/noAction";
import IconButton from "./IconButton";

const Toolbar = React.memo(function Toolbar({
  reset = noAction,
  canUndo = false,
  undo = noAction,
  save = noAction
}) {
  return (
    <View style={styles.toolbar}>
      <View style={styles.left}>
        <IconButton name="trash" action={reset} />
        <IconButton name="undo" disabled={!canUndo} action={undo} />
      </View>
      <View style={styles.right}>
        <IconButton name="download" action={save} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: Colors.darker,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  right: {
    flexDirection: "row"
  }
});

export default Toolbar;
