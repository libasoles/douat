import React from "react";
import * as Immutable from "immutable";

import Row from "./TilesMap/Row";

function areEqual(prevProps, nextProps) {
  const tilesAreEqual = Object.is(prevProps.tiles, nextProps.tiles);
  const frontColorIsEqual = prevProps.frontColor === nextProps.frontColor;

  return tilesAreEqual && frontColorIsEqual;
}

type TilesMapProps = {
  tiles: Immutable.OrderedMap,
  tileSize: number
};

const TilesMap = React.memo(function TilesMap({
  tiles,
  tileSize
}: TilesMapProps) {
  return (
    <>
      {tiles.entrySeq().map(([x, data]) => {
        return <Row key={x} rowNumber={x} rowData={data} tileSize={tileSize} />;
      })}
    </>
  );
},
areEqual);

export default TilesMap;
