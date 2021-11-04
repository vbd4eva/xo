import React from "react";

export default function InformPanel({
  playerTurn,
  namePlayerX,
  scorePlayerX,
  namePlayerO,
  scorePlayerO,
  freezeArena,
  nextGame,
}) {
  const players = {
    X: { name: namePlayerX, score: scorePlayerX },
    O: { name: namePlayerO, score: scorePlayerO },
  };

  return (
    <div className="game__score">
      {(freezeArena && (
        <button
          className="button score__next-game-btn"
          type="button"
          onClick={nextGame}
        >
          Play next
        </button>
      )) || (
        <p>
          The player <br />
          <b>{playerTurn}</b>
          <br /> is turn now.
        </p>
      )}
      <p className="score__heading">Score</p>
      {Object.keys(players).map((key) => {
        const { name, score } = players[key];
        return (
          <p className="score__player-info" key={key}>
            <i>{key}</i> <span>{name}: </span> <b>{score}</b>
          </p>
        );
      })}
    </div>
  );
}
