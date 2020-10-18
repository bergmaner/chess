import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";

const chess = new Chess();

export const gameSubject = new BehaviorSubject();

export const resetGame = () => {
  chess.reset();
  updateGame();
};

export const getPromotions = () => {
  return chess.moves({ verbose: true }).filter((move) => move.promotion);
};

export const handleMove = (from, to) => {
  const promotions = getPromotions();

  if (
    promotions.some(
      (promotion) => `${promotion.from}:${promotion.to}` === `${from}:${to}`
    )
  ) {
    const actualPromotion = { from, to, color: promotions[0].color };
    updateGame(actualPromotion);
  }
  const { promotion } = gameSubject.getValue();
  if (!promotion) move(from, to);
};

export const move = (from, to, promotion) => {
  const tempMove = { from, to };

  if (promotion) tempMove.promotion = promotion;

  const legalMove = chess.move(tempMove);
  console.log(legalMove, "legal");

  if (legalMove) {
    updateGame();
  }
};

const getCurrentTurn = () => {
  if (chess.history().length % 2 === 0) return "w";
  return "b";
};

const getCaptured = () => {
  const history = chess.history({ verbose: true });
  const initial = [];

  var captured = history.reduce((acc, move) => {
    if ("captured" in move) {
      const piece = move.captured;
      const color = move.color == "w" ? "b" : "w";
      acc.push({ color, piece });
      return acc;
    } else {
      return acc;
    }
  }, initial);

  return captured;
};

const updateGame = (promotion) => {
  const isGameOver = chess.game_over();

  const newGame = {
    board: chess.board(),
    promotion,
    isGameOver,
    result: isGameOver ? getResult() : null,
    turn: getCurrentTurn(),
    captured: getCaptured(),
  };
  gameSubject.next(newGame);
};

const getResult = () => {
  if (chess.in_checkmate()) {
    const winner = getCurrentTurn() === "b" ? "WHITE" : "BLACK";
    return `WINNER - ${winner} - CHECKMATE`;
  } else if (chess.in_draw()) {
    let reason = "50 MOVES";
    if (chess.in_stalemate()) reason = "STALEMATE";
    else if (chess.in_threefold_repetition()) reason = "REPETITION";
    else if (chess.insufficent_material()) reason = "INSUFFICENT MATERIAL";
    return `DRAW - ${reason}`;
  }
  return "UNKNOWN METHOD";
};

export const initGame = () => {
  updateGame();
};

export const getAvaibleMoves = (position) => {
  const moves = chess.moves({ square: position });

  return moves;
};

export const isAvaibleMove = (moves, position) => {
  let isAvaible = false;
  const promotions = getPromotions();
  moves &&
    moves.forEach((move) => {
      let tempMove = move;

      if (tempMove.lastIndexOf("+") !== -1 || tempMove.lastIndexOf("#") !== -1)
        tempMove = tempMove.substring(tempMove.length - 3, tempMove.length - 1);
      else if (
        tempMove.length > 2 &&
        tempMove !== "O-O" &&
        tempMove !== "O-O-O"
      )
        tempMove = tempMove.substring(tempMove.length - 2, tempMove.length);

      if (tempMove === position) {
        isAvaible = true;
      }
      if (tempMove === "O-O" && position[0] === "g") {
        if (
          (position[1] === "1" && getCurrentTurn() === "w") ||
          (position[1] === "8" && getCurrentTurn() === "b")
        )
          isAvaible = true;
      }

      if (tempMove === "O-O-O" && position[0] === "c") {
        if (
          (position[1] === "1" && getCurrentTurn() === "w") ||
          (position[1] === "8" && getCurrentTurn() === "b")
        )
          isAvaible = true;
      }

      promotions &&
        promotions.map((promotion) => {
          if (position === promotion.to) isAvaible = true;
        });
    });

  return isAvaible;
};
