import React from "react";
import { View } from "react-native";
import * as Immutable from "immutable";
import { is } from "immutable";

import Tile from "../../Tile";

function areEqual(prevProps, nextProps) {
  const tilesAreEqual = is(prevProps.rowData, nextProps.rowData);
  const frontColorIsEqual = prevProps.frontColor === nextProps.frontColor;
  const eventIsTheSame = prevProps.onPress === nextProps.onPress;

  return tilesAreEqual && frontColorIsEqual && eventIsTheSame;
}

type RowProps = {
  tiles: Immutable.OrderedMap,
  frontColor: string,
  tileSize: number,
  onPress: () => {}
};

const Row = React.memo(
  ({ rowNumber, rowData, frontColor, tileSize, onPress }: RowProps) => {
    return (
      <View>
        {rowData.entrySeq().map(([colNumber, tile]) => {
          return (
            <Tile
              key={colNumber}
              symbol={tile}
              color={frontColor}
              onSelect={() => onPress(rowNumber, colNumber)}
              size={tileSize}
            />
          );
        })}
      </View>
    );
  },
  areEqual
);

export default Row;
