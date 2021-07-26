import React from "react";

export default function InformPanel({
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
      {freezeArena && (
        <button type="button" onClick={nextGame}>
          Продолжить игру
        </button>
      )}
      <p>Score</p>
      {Object.keys(players).map((key) => {
        const { name, score } = players[key];
        return (
          <p key={key}>
            <i>{key}</i> <b>{name}: </b> <span>{score}</span>
          </p>
        );
      })}
    </div>
  );
}
