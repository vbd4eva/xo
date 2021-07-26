import { useState, useRef } from "react";

import Modal from "../Modal";
import GreetingForm from "../GreetingForm";
import Arena from "../Arena";
import InformPanel from "../InformPanel";

export default function Game() {
  const [showModal, setShowModal] = useState(true);
  const [playerMark, setPlayerMark] = useState("X");

  const [namePlayerX, setNamePlayerX] = useState(null);
  const [scorePlayerX, setScorePlayerX] = useState(0);

  const [namePlayerO, setNamePlayerO] = useState(null);
  const [scorePlayerO, setScorePlayerO] = useState(0);

  const [winCombination, setWinCombination] = useState(null);
  const [freezeArena, setFreezeArena] = useState(false);

  const players = {
    X: { name: namePlayerX, score: scorePlayerX },
    O: { name: namePlayerO, score: scorePlayerO },
  };

  const handleGreetingForm = (playerNamesObj) => {
    closeModal();

    const playerName = {
      X: setNamePlayerX,
      O: setNamePlayerO,
    };
    Object.keys(playerNamesObj).forEach((key) => {
      playerName[key](playerNamesObj[key]);
    });
  };

  const changePlayer = () => {
    setPlayerMark((currentMark) => (currentMark === "X" ? "O" : "X"));
  };

  const handlePlayerWin = (playerMark, winnerCombination) => {
    setFreezeArena(true);
    setWinCombination(winnerCombination);
    const countWin = {
      X: setScorePlayerX,
      O: setScorePlayerO,
    };
    countWin[playerMark]((prev) => prev + 1);
    alert(`Победа игрока ${players[playerMark].name}`);
  };

  const nextGame = () => {
    setWinCombination(null);
    setFreezeArena(false);
  };

  function closeModal() {
    setShowModal((prevState) => !prevState);
  }

  return (
    <div className="game">
      {showModal ? (
        <Modal>
          <GreetingForm onHandleForm={handleGreetingForm} />
        </Modal>
      ) : (
        <>
          <Arena
            handlePlayerWin={handlePlayerWin}
            playerMark={playerMark}
            changePlayer={changePlayer}
            winnerCombination={winCombination}
            freezeArena={freezeArena}
          />
          <InformPanel
            namePlayerX={namePlayerX}
            scorePlayerX={scorePlayerX}
            namePlayerO={namePlayerO}
            scorePlayerO={scorePlayerO}
            freezeArena={freezeArena}
            nextGame={nextGame}
          />
        </>
      )}
    </div>
  );
}
