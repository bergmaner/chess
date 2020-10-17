import React from "react";
import { move } from "./Game";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  img {
    height: 30px;
    cursor: pointer;
  }
`;

const promotions = ["r", "n", "b", "q"];

const Promote = ({ promotion }) => {
  const { from, to, color } = promotion;
  return (
    <Container>
      {promotions.map((item) => (
        <div onClick={() => move(from, to, item)}>
          <img src={require(`./assets/${item}_${color}.png`)} />
        </div>
      ))}
    </Container>
  );
};
export default Promote;
