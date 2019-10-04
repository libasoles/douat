import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { noAction } from "../helpers/noAction";
import Tile from "./Tile";
import Colors from "../config/colors";

function keyExtractor(item) {
  return String(item);
}

const TilesBar = React.memo(function TilesBar({
  tiles = [],
  selectedTile,
  defaultTile,
  tileSize = 60,
  onSelect = noAction,
  currentTileBackground
}) {
  const getBgColor = useCallback(
    item => {
      const isSelected = selectedTile === item;

      return isSelected ? currentTileBackground : Colors.none;
    },
    [currentTileBackground, selectedTile]
  );

  return (
    <View style={styles.container}>
      <Tile
        symbol={defaultTile}
        backgroundColor={getBgColor(defaultTile)}
        onSelect={onSelect}
        style={styles.tile}
        size={tileSize}
      />

      <FlatList
        style={styles.tiles}
        horizontal={true}
        data={tiles}
        keyExtractor={keyExtractor}
        extraData={{ currentTileBackground, selectedTile }}
        renderItem={({ item }) => {
          const backgroundColor = getBgColor(item);

          return (
            <Tile
              key={item}
              symbol={item}
              backgroundColor={backgroundColor}
              onSelect={onSelect}
              style={styles.tile}
              size={tileSize}
            />
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  tiles: {
    backgroundColor: Colors.dark
  },
  tile: {
    marginRight: 2
  }
});

export default TilesBar;
