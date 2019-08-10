import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { noAction } from "../helpers/noAction";
import Tile from "./Tile";
import Colors from "../config/colors";

function keyExtractor(item) {
  return String(item);
}

function TilesBar({
  tiles = [],
  selectedTile,
  onSelect = noAction,
  currentTileBackground
}) {
  return (
    <FlatList
      style={styles.tiles}
      horizontal={true}
      data={tiles}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => {
        return (
          <Tile
            key={item}
            symbol={item}
            isSelected={selectedTile === item}
            bgColor={currentTileBackground}
            onSelect={onSelect}
            separation={{ marginRight: 2 }}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  tiles: {
    backgroundColor: Colors.dark
  }
});

export default TilesBar;
