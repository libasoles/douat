import React from "react";
import { Button, StyleSheet, View } from "react-native";

import Colors from "../config/colors";
import { noAction } from "../helpers/noAction";
import IconButton from "./IconButton";

function Toolbar({ reset = noAction, undo = noAction, save = noAction }) {
  return (
    <View style={styles.toolbar}>
      <View style={styles.left}>
        <IconButton name="reset" action={reset} />
        <IconButton name="undo" action={undo} />
      </View>
      <View style={styles.right}>
        <Button title={"Save"} onPress={save} />
        <IconButton name="share" action={noAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: Colors.white,
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
