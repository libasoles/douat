import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { noAction } from "../helpers/noAction";
import Tile from "./Tile";
import Colors from "../config/colors";

function keyExtractor(item) {
  return String(item);
}

const TilesBar = React.memo(function TilesBar({
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
      extraData={{ currentTileBackground, selectedTile }}
      renderItem={({ item }) => {
        const isSelected = selectedTile === item;
        const backgroundColor = isSelected
          ? currentTileBackground
          : Colors.none;

        return (
          <Tile
            key={item}
            symbol={item}
            backgroundColor={backgroundColor}
            onSelect={onSelect}
            style={{ marginRight: 2 }}
            size={60}
          />
        );
      }}
    />
  );
});

const styles = StyleSheet.create({
  tiles: {
    backgroundColor: Colors.dark
  }
});

export default TilesBar;
