import React from "react";
import styled from "styled-components";

const Piece = styled.div`
    background: ${props => props.black ? "#000" : "#FFF"};
    width: 75px;
    height: 75px;
`;

const Square = ({ children, black }) => {
  return <Piece black={black}>{children}</Piece>;
};

export default Square;
