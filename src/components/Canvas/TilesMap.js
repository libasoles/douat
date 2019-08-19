import React from "react";
import { StyleSheet, View } from "react-native";

import Tile from "../Tile";
import { noAction } from "../../helpers/noAction";

function areEqual(prevProps, nextProps) {
  const tilesAreEqual = Object.is(prevProps.tiles, nextProps.tiles);
  const frontColorIsEqual =
    prevProps.backgroundColor === nextProps.backgroundColor;

  return tilesAreEqual && frontColorIsEqual;
}

const TilesMap = React.memo(function TilesMap({
  tiles = [],
  frontColor,
  tileSize,
  onPress = noAction
}) {
  return (
    <>
      {tiles.map((row, i) => {
        return (
          <View key={i}>
            {row.map((seal, j) => {
              return (
                <Tile
                  key={j}
                  symbol={seal}
                  color={frontColor}
                  onSelect={() => onPress(i, j)}
                  size={tileSize}
                />
              );
            })}
          </View>
        );
      })}
    </>
  );
},
areEqual);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  canvas: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TilesMap;
