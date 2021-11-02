import { compareLocations } from "functional-game-utils";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

import Grid from "./Grid";

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: min-content auto;
  grid-template-areas:
    ". top"
    "left grid";

  margin: 2rem auto;
  padding: 2rem;
  max-width: 1200px;
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

const Board = ({ tiles, hints, onTileClick }) => {
  const [mouseDownLocation, setMouseDownLocation] = useState({
    row: -1,
    col: -1,
  });

  return (
    <BoardContainer>
      <TopHintsContainer>
        <Grid
          tiles={hints.top}
          renderTile={(value, location) => (
            <div key={JSON.stringify(location)}>{value}</div>
          )}
        />
      </TopHintsContainer>
      <LeftHintsContainer>
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
            <div
              key={JSON.stringify(location)}
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
            </div>
          )}
        />
      </GridContainer>
    </BoardContainer>
  );
};

export default Board;
