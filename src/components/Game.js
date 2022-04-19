import React from "react";
import Board from "./Board";
import { useState } from "react";
import { calculateWinner } from "../helpers";
import Square from "./Square";

const styles = {
  width: "200px",
  margin: "20px auto",
};

const liStyles = {
    color: "blue"
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
    console.log(i);
    
   
};

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const active = {
    fontWeight: "bold",
  };

  const inactive = {
    fontWeight: "normal",
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go back to move #${move}` : "Go to start";
      return (
        <li style={liStyles} key={move}>
          <button className="libutt"
            style={stepNumber === move ? active : inactive}
            onClick={() => jumpTo(move)}
          >
            {destination}
          </button>
        </li>
      );
    });

  return (
    <>
    <h1>The game everyone loves to hate</h1>
    <h2>Tic Tac Toe</h2>
      <Board squares={history[stepNumber]} onClick={handleClick} />;
      <div style={styles}>
        <p>
          {winner
            ? "Winner: " + winner 
            : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
        
        {renderMoves()}
        
      </div>
    </>
  );
};

export default Game;
