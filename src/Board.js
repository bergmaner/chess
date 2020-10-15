import React from "react";
import BoardSquare from "./BoardSquare";
import styled from "styled-components";
import { isBlack } from "./helpers";
import { getPosition } from "./helpers";

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const SquareContainer = styled.div`
  width: 12.5%;
  height: 12.5%;
`;

const Board = ({ board }) => {
  return (
    <BoardContainer>
      {board.flat().map((piece, i) => (
        <SquareContainer key={i}>
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
        </SquareContainer>
      ))}
    </BoardContainer>
  );
};

export default Board;
