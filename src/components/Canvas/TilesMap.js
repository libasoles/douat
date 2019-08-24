import React from "react";
import * as Immutable from "immutable";

import { noAction } from "../../helpers/noAction";
import Row from "./TilesMap/Row";

function areEqual(prevProps, nextProps) {
  const tilesAreEqual = Object.is(prevProps.tiles, nextProps.tiles);
  const frontColorIsEqual = prevProps.frontColor === nextProps.frontColor;
  const eventIsTheSame = prevProps.onPress === nextProps.onPress;

  return tilesAreEqual && frontColorIsEqual && eventIsTheSame;
}

type TilesMapProps = {
  tiles: Immutable.OrderedMap,
  frontColor: string,
  tileSize: number,
  onPress: () => {}
};

const TilesMap = React.memo(function TilesMap({
  tiles,
  frontColor,
  tileSize,
  onPress = noAction
}: TilesMapProps) {
  return (
    <>
      {tiles.entrySeq().map(([x, data]) => {
        return (
          <Row
            key={x}
            rowNumber={x}
            rowData={data}
            frontColor={frontColor}
            tileSize={tileSize}
            onPress={onPress}
          />
        );
      })}
    </>
  );
},
areEqual);

export default TilesMap;
