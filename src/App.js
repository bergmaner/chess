import React, { useEffect, useState } from "react";
import { gameSubject } from "./Game";
import Board from "./Board";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #BECE9F;
`;

const BoardContainer = styled.div`
  width: 600px;
  height: 600px;
`;

const App = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => setBoard(game.board));
    return () => subscribe.unsubscribe();
  }, []);

  return (
    <Container>
      <BoardContainer>
        <Board board={board} />
      </BoardContainer>
    </Container>
  );
};

export default App;
