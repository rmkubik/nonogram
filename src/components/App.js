import {
  constructArray,
  constructMatrix,
  updateMatrix,
  rotateMatrix,
  MATRIX_ROTATION_DIRECTIONS,
} from "functional-game-utils";
import { ThemeProvider } from "styled-components";
import React, { useState } from "react";

import Board from "./Board";
import Center from "./Center";

const theme = {
  tileSize: 32,
};

const rotateMatrixCounterClockwise = rotateMatrix({
  direction: MATRIX_ROTATION_DIRECTIONS.COUNTER_CLOCKWISE,
});

const padArrayEnd = (array, value, count) => {
  if (array.length >= count) {
    return array;
  }

  return [...array, ...constructArray(() => value, count - array.length)];
};

const padArrayStart = (array, value, count) => {
  if (array.length >= count) {
    return array;
  }

  return [...constructArray(() => value, count - array.length), ...array];
};

const initialPuzzle = {
  dimensions: {
    width: 10,
    height: 10,
  },
  hints: {
    top: rotateMatrixCounterClockwise(
      [
        [2, 5],
        [3, 3],
        [3, 4],
        [7],
        [7],
        [4],
        [1, 2, 1, 1],
        [1, 1],
        [2],
        [1, 2],
      ].map((array) => padArrayEnd(array, undefined, 4))
    ),
    left: [[1], [1, 1, 1], [5, 2], [5, 4], [5], [5], [6], [6, 1], [6], [1]].map(
      (array) => padArrayStart(array, undefined, 3)
    ),
  },
};

const initialTiles = constructMatrix(() => "", initialPuzzle.dimensions);

const App = () => {
  const [puzzle, setPuzzle] = useState(initialPuzzle);
  const [tiles, setTiles] = useState(initialTiles);
  const [hints, setHints] = useState(puzzle.hints);

  return (
    <ThemeProvider theme={theme}>
      <Center>
        <Board
          tiles={tiles}
          hints={hints}
          onTileClick={(event, value, location) => {
            let newValue = value;

            if (event.button === 0) {
              // left click
              if (value === "" || value === "❌") {
                newValue = "⬛️";
              } else {
                newValue = "";
              }
            } else if (event.button === 2) {
              // right click
              if (value === "" || value === "⬛️") {
                newValue = "❌";
              } else {
                newValue = "";
              }
            }

            const newTiles = updateMatrix(location, newValue, tiles);

            setTiles(newTiles);
          }}
        />
      </Center>
    </ThemeProvider>
  );
};

export default App;
