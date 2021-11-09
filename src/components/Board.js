import { compareLocations, getDimensions } from "functional-game-utils";
import React, { useCallback, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import Grid from "./Grid";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: min-content auto;
  grid-template-areas:
    ". top"
    "left grid";

  margin-left: ${(props) => `-${props.leftOffset}px`};
  margin-top: ${(props) => `-${props.topOffset}px`};
`;

const TopHintsContainer = styled.div`
  grid-area: top;
`;

const LeftHintsContainer = styled.div`
  grid-area: left;
`;

const GridContainer = styled.div`
  grid-area: grid;
`;

const shouldBoldRow = (row, height) =>
  row !== 0 && row !== height - 1 && (row + 1) % 5 === 0;
const shouldBoldCol = (col, width) =>
  col !== 0 && col !== width - 1 && col % 5 === 0;

/**
 * Conditionally show borders based on our location
 * in the grid.
 */
const Tile = styled.div`
  box-sizing: border-box;
  height: 2rem;

  border-top: ${(props) => (props.top ? "1px solid black" : "")};
  border-bottom: 1px solid black;
  border-bottom-width: ${(props) =>
    shouldBoldRow(props.location.row, props.gridDimensions.height)
      ? "2px"
      : "1px"};
  border-left: 1px solid black;
  border-left-width: ${(props) =>
    shouldBoldCol(props.location.col, props.gridDimensions.width)
      ? "2px"
      : "1px"};
  border-right: ${(props) => (props.right ? "1px solid black" : "")};
`;

const Board = ({ tiles, hints, onTileClick }) => {
  const [mouseDownLocation, setMouseDownLocation] = useState({
    row: -1,
    col: -1,
  });
  const { width, height } = getDimensions(tiles);

  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const leftHintsRef = useCallback((node) => {
    if (node !== null) {
      setLeftOffset(node.getBoundingClientRect().width);
    }
  }, []);
  const topHintsRef = useCallback((node) => {
    if (node !== null) {
      setTopOffset(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <BoardContainer leftOffset={leftOffset} topOffset={topOffset}>
      <TopHintsContainer ref={topHintsRef}>
        <Grid
          tiles={hints.top}
          renderTile={(value, location) => (
            <div key={JSON.stringify(location)}>{value}</div>
          )}
        />
      </TopHintsContainer>
      <LeftHintsContainer ref={leftHintsRef}>
        <Grid
          tiles={hints.left}
          renderTile={(value, location) => (
            <div key={JSON.stringify(location)}>{value}</div>
          )}
        />
      </LeftHintsContainer>
      <GridContainer>
        <Grid
          tiles={tiles}
          renderTile={(tile, location) => (
            <Tile
              top={location.row === 0}
              bottom={location.row === height - 1}
              left={location.col === 0}
              right={location.col === width - 1}
              key={JSON.stringify(location)}
              location={location}
              gridDimensions={{ width, height }}
              onMouseDown={(event) => {
                setMouseDownLocation(location);
              }}
              onMouseUp={(event) => {
                if (compareLocations(mouseDownLocation, location)) {
                  onTileClick(event, tile, location);
                }
              }}
            >
              {tile}
            </Tile>
          )}
        />
      </GridContainer>
    </BoardContainer>
  );
};

export default Board;
