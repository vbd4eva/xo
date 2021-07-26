import React from "react";

export default function PlayBox({ getMark, mark }) {
  const markClass = mark ? ` ${mark}` : "";
  return (
    <div className="game__play-box" onClick={getMark}>
      <div className={`game__play-mark${markClass}`}></div>
    </div>
  );
}
