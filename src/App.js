import React, { useEffect, useState } from "react";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bece9f;
`;

const TurnContainer = styled.div`
  display: flex;
  align-items: center;
  img{
    height: 40px;
    padding-left: 5px;
  }
`;

const BoardContainer = styled.div`
  width: 600px !important;
  height: 600px;
`;

const CapturedContainer = styled.div`
  min-height: 100px;
  img{
    height: 40px;
    padding: 2px;
  }
`;

const GameInfo = styled.div`
 width: 350px !important;
 padding-right: 35px;
`;

const App = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState("");
  const [result, setResult] = useState();
  const [turn, setTurn] = useState("w");
  const [captured, setCaptured] = useState([]);

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
      setCaptured( game.captured );
    });
    return () => subscribe.unsubscribe();
  }, []);

console.log(captured)

  return (
    <Container>
      <GameInfo><h1>Chess Game</h1>
      {captured && <CapturedContainer> <h2>Captured: </h2>{captured.map((item,index) => <img key={index} src={require(`./assets/${item.piece}_${item.color}.png`)}/>) }</CapturedContainer>}
      {isGameOver ? 
         <div><h1>GAME OVER</h1><h2>{result}</h2><button onClick={resetGame}>RESTART</button></div>
         : <TurnContainer>Now is turn <img src={require(`./assets/p_${turn}.png`)} /></TurnContainer>
      }
        </GameInfo>
      <BoardContainer>
        <Board board={board} />
      </BoardContainer>
    </Container>
  );
};

export default App;
