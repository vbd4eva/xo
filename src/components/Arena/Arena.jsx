import { useState, useEffect, useRef } from "react";
import PlayBox from "../PlayBox";

const winCombinations = [
  "012",
  "345",
  "678",
  "036",
  "147",
  "258",
  "048",
  "246",
];
const aveilableWinCombinations = {
  left: [...winCombinations],
  X: [],
  O: [],

  isGameDraw() {
    const { X, O, left } = this;
    const isGameDraw = !(X.length + O.length + left.length);
    isGameDraw && this.reset();
    return isGameDraw;
  },

  update(player, number) {
    const { getOponent, left } = this;
    const oponent = getOponent(player);

    if (left.length > 0) {
      const newLeft = [];
      //   const newPlayers = ["newPlayers"];
      left.forEach((comb) => {
        (comb.includes(number) ? this[player] : newLeft).push(comb);
      });

      this.left = [...newLeft];
    }

    if (this[oponent].length > 0) {
      this[oponent] = this[oponent].filter((comb) => !comb.includes(number));
    }
  },
  getOponent(player) {
    return player === "X" ? "O" : "X";
  },
  reset() {
    this.left = [...winCombinations];
    this.X = [];
    this.O = [];
  },
};

const movesStatistic = {
  X: "",
  O: "",
  update(player, move) {
    this[player] += move;
  },
  reset() {
    this.X = "";
    this.O = "";
  },
};

export default function Arena({
  handlePlayerWin,
  playerMark,
  changePlayer,
  winnerCombination,
  freezeArena,
}) {
  const isFirstRender = useRef(true);
  // const freezeArena = useRef(false);

  // const arenaMarks = useRef(Array(9).fill(null));
  const [arenaMarks, setArenaMarks] = useState(Array(9).fill(null));
  const [arenaMarksNum, setArenaMarksNum] = useState(() => countArenaMarks());

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = !isFirstRender.current;
      return;
    }

    // console.log("Player Mark Box! (arenaMarksNum) " + arenaMarksNum);
    if (arenaMarksNum >= 5) {
      checkGameEnd();
    }
    changePlayer();
  }, [arenaMarksNum]);

  useEffect(() => {
    if (!freezeArena && countArenaMarks()) onRoundEnd();
  }, [freezeArena]);

  const makeMove = (boxIndex) => {
    if (freezeArena) return;

    if (arenaMarks[boxIndex]) {
      alert("Ячейка занята!");
      return;
    }
    arenaMarks[boxIndex] = playerMark;
    setArenaMarksNum(countArenaMarks());

    movesStatistic.update(playerMark, boxIndex);
    aveilableWinCombinations.update(playerMark, boxIndex);
  };

  function checkGameEnd() {
    const winnerCombination = checkWinnerCombination();
    if (winnerCombination) {
      handlePlayerWin(playerMark, winnerCombination);
      return;
    }

    aveilableWinCombinations.isGameDraw() && onGameDraw();
  }

  function countArenaMarks() {
    return arenaMarks.join("").length;
  }

  function checkWinnerCombination() {
    const playerMoves = movesStatistic[playerMark];
    const winComb = [...aveilableWinCombinations[playerMark]];

    const sortMoves = playerMoves.split("").sort().join("");
    // console.log("playerMoves", sortMoves);
    // console.log("combinations", winComb);
    return winComb.find((comb) => {
      const reg = new RegExp(`[^${comb}]`, "g");
      const match = sortMoves.replace(reg, "");
      if (comb === match) return comb;
    });
  }

  // function onWin(winner) {
  //   alert("Победа игрока #" + playerMark);
  //   console.log("winner", winner);
  //   handlePlayerWin(winner);
  //   onRoundEnd();
  // }
  function onGameDraw() {
    alert("Нет выиграшных ходов :(? - Ничья!");
    onRoundEnd();
  }

  function onRoundEnd() {
    console.log("End of the round");
    resetArena();
    movesStatistic.reset();
    console.log(movesStatistic);
    aveilableWinCombinations.reset();

    console.log(aveilableWinCombinations);
  }

  function resetArena() {
    setArenaMarks(Array(9).fill(null));
  }

  return (
    <>
      {" "}
      <div className="game__play-stage">
        {arenaMarks.map((mark, boxIndex) => (
          <PlayBox
            key={boxIndex}
            getMark={() => makeMove(boxIndex)}
            mark={mark}
          />
        ))}
      </div>
      <hr />
      {winnerCombination && <h1>{winnerCombination}</h1>}
    </>
  );
}
