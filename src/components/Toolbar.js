import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../config/colors";
import { noAction } from "../helpers/noAction";
import IconButton from "./IconButton";

function Toolbar({
  reset = noAction,
  undo = noAction,
  save = noAction,
  share = noAction
}) {
  return (
    <View style={styles.toolbar}>
      <View style={styles.left}>
        <IconButton name="recycle" action={reset} />
        <IconButton name="undo" action={undo} />
      </View>
      <View style={styles.right}>
        <IconButton name="download" action={save} />
        <IconButton name="share" action={share} />
      </View>
    </View>
  );
}

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
