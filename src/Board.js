import React, { useState } from "react";
import BoardSquare from "./BoardSquare";
import styled from "styled-components";
import { isBlack } from "./helpers";
import { getPosition } from "./helpers";
import { getAvaibleMoves } from "./Game";

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
  const [moves, setMoves] = useState([]);

  return (
    <BoardContainer>
      {board.flat().map((piece, i) => (
        <SquareContainer key={i}>
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
            moves={moves}
            setMoves={setMoves}
          />
        </SquareContainer>
      ))}
    </BoardContainer>
  );
};

export default Board;
