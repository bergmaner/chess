import React, {useState} from "react";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import {  move } from "./Game";

const BoardSquare = ({ piece, black, position, moves, setMoves }) => {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split('_');
      move(fromPosition, position);
    },
  });

  return (
    <div ref={drop}>
      <Square black={black}>
        { <Piece piece={piece} position={position} moves={moves} setMoves={setMoves}></Piece>}
      </Square>
    </div>
  );
};

export default BoardSquare;
