import React, { useState, useEffect } from "react";
import {getAvaibleMoves} from "./Game"
import { useDrag, DragPreviewImage } from "react-dnd";
import { isAvaibleMove } from "./Game";
import styled from "styled-components";

const Container = styled.div`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  background: green;
  width: 16px;
  height: 16px;
  border-radius: 16px;
`;

const PieceContainer = styled.div`
  cursor: grab;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
  img {
    height: 70%;
  }
  ::before{
    content: '';
    position: absolute;
    background: green;
    width: ${ props => props.isAvaible && '16px'};
    height: ${ props => props.isAvaible && '16px'};
    border-radius: 16px;
  }
`;

const Piece = ({ piece, position, moves, setMoves}) => {

  const pieceIndex = piece && `${piece.type}_${piece.color}`;
  const pieceImg = piece && require(`./assets/${pieceIndex}.png`);
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: "piece",
      id: piece && `${position}_${piece.type}_${piece.color}`,
    },
    collect: (monitor) => {
      console.log(monitor.itemID)
      return { isDragging: !!monitor.isDragging() };
    }
  });

  useEffect(() => {
    isDragging ? setMoves(getAvaibleMoves(position)) : setMoves([]);
  }, [isDragging]);


  return (
    piece ?
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <PieceContainer isAvaible={isAvaibleMove(moves, position)} ref={drag}>
        <img src={pieceImg} alt="" />
      </PieceContainer>
    </>
    : 
    isAvaibleMove(moves, position, isDragging) && <Container><Circle/></Container>
  );
};

export default Piece;
