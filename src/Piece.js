import React from "react";
import styled from "styled-components";

const PieceContainer = styled.div`
cursor: grab;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
img{
    height: 70%;
}
`;

const Piece = ({ piece: {type, color} }) => {

    const pieceImg = require(`./assets/${type}_${color}.png`)

  return <PieceContainer><img src={pieceImg} alt="" /></PieceContainer>;
};

export default Piece;
