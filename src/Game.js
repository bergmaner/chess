import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";
import { getPosition } from "./helpers";

const chess = new Chess();

export const gameSubject = new BehaviorSubject({
  board: chess.board(),
});

export const move = (from, to, setTurn) => {
  const legalMove = chess.move({ from, to });
  console.log(legalMove, "hh");
  if (legalMove) {
    gameSubject.next({ board: chess.board() });
    let color = legalMove.color === "b" ? "w" : "b";
    console.log("color", color)
  }
};

export const getAvaibleMoves = (position) => {
  const moves = chess.moves({ square: position });
  return moves;
};

export const isAvaibleMove = (moves, position) => {
  let isAvaible = false;

  moves &&
    moves.forEach((move) => {
      let tempMove = move;
     
      if (tempMove.lastIndexOf('+') !== -1 ) 
        tempMove = tempMove.substring(tempMove.length - 3, tempMove.length - 1);
      else if (tempMove.length > 2 && tempMove !== "O-O")
        tempMove = tempMove.substring(tempMove.length - 2, tempMove.length);


      if (tempMove === position) {
        isAvaible = true;
      }
      if(tempMove === "O-O" && position[0] ==="g" && (position[1] === "1" || position[1] === "8")){
        isAvaible = true;
      }
    });

  return isAvaible;
};
