import React from "react";
import { View } from "react-native";
import * as Immutable from "immutable";
import { is } from "immutable";

import Tile from "./Tile";

function areEqual(prevProps, nextProps) {
  const tilesAreEqual = is(prevProps.rowData, nextProps.rowData);
  const frontColorIsEqual = prevProps.frontColor === nextProps.frontColor;

  return tilesAreEqual && frontColorIsEqual;
}

type RowProps = {
  tiles: Immutable.OrderedMap,
  frontColor: string,
  tileSize: number
};

const Row = React.memo(
  ({ rowNumber, rowData, frontColor, tileSize }: RowProps) => {
    return (
      <View>
        {rowData.entrySeq().map(([colNumber, tile]) => {
          return (
            <Tile
              key={colNumber}
              symbol={tile}
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
