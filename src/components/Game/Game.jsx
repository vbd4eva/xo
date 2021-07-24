import React from "react";

import Arena from "../Arena";

export default function Game() {
  return (
    <div className="game">
      <Arena />
      <p className="game__score">
        <span>Score</span>
        <br />
        <span>
          Player 1: <b>0</b>
        </span>
        <br />
        <span>
          Player 2: <b>0</b>
        </span>
      </p>
    </div>
  );
}
