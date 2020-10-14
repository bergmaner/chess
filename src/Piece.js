import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import styled from "styled-components";

const PieceContainer = styled.div`
  cursor: grab;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.isDragging ? 0 :1};
  img {
    height: 70%;
  }
`;


const Piece = ({ piece: { type, color } }) => {
  const pieceIndex = `${type}_${color}`;
  const pieceImg = require(`./assets/${pieceIndex}.png`);
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: 'piece',
      id: pieceIndex,
    },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() }
    },
  })

  return (
      <>
    <DragPreviewImage connect={preview} src={pieceImg} />
      <PieceContainer isDragging={isDragging} ref={drag}>
        <img src={pieceImg} alt=""  />
      </PieceContainer>
</>

  );
};

export default Piece;
