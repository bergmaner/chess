import React, { useState, useEffect } from "react";
import Square from "./Square";
import Piece from "./Piece";
import Promote from "./Promote";
import { useDrop } from "react-dnd";
import { handleMove, gameSubject } from "./Game";

const BoardSquare = ({ piece, black, position, moves, setMoves }) => {
  const [actualPromotion, setActualPromotion] = useState("");
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const [fromPosition] = item.id.split("_");
      handleMove(fromPosition, position);
    },
  });

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ promotion }) =>
      promotion && promotion.to === position
        ? setActualPromotion(promotion)
        : setActualPromotion(null)
    );
    return () => subscribe.unsubscribe();
  }, []);

  return (
    <div ref={drop}>
      <Square black={black}>
        {actualPromotion ? (
          <Promote promotion={actualPromotion} />
        ) :
          <Piece
            piece={piece}
            position={position}
            moves={moves}
            setMoves={setMoves}
          />
       }
      </Square>
    </div>
  );
};

export default BoardSquare;
