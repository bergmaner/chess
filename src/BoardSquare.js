import React from "react";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { move } from "./Game";

const BoardSquare = ({ piece, black, position }) => {
  console.log(position, "dd")
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split('_');
      console.log(item.id,'dd');
      move(fromPosition, position);
    },
  });

  return (
    <div ref={drop}>
      <Square black={black}>
        {piece && <Piece piece={piece} position={position}></Piece>}
      </Square>
    </div>
  );
};

export default BoardSquare;
