import React from "react";
import Square from "./Square";
import Piece from "./Piece";

const BoardSquare = ({ piece, black }) => {
  return (
    <div>
      <Square black={black}>{piece && <Piece piece={piece}></Piece>}</Square>
    </div>
  );
};

export default BoardSquare;
