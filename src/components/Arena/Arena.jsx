import React from "react";
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
const players = {
  X: { currentGameMoves: "" },
  O: { currentGameMoves: "" },

  updatePlayerMoves(player, move) {
    this[player].currentGameMoves = this[player].currentGameMoves + move;
    return this[player].currentGameMoves;
  },
};
const aveilableWinCombinations = {
  left: [...winCombinations],
  X: [],
  O: [],
  handleCombinations(player, number) {
    const oponent = this.getOponent(player);

    if (this.left.length > 0) {
      const newLeft = [];
      //   const newPlayers = ["newPlayers"];
      this.left.forEach((comb) => {
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
};

export default class Arena extends React.Component {
  state = {
    move: "X",
    makedMoves: Array(9).fill(null),
  };

  checkWinner(player, playerMoves) {
    const sortMoves = playerMoves.split("").sort().join("");
    console.log("playerMoves", sortMoves);
    console.log("combinations", aveilableWinCombinations[player]);
    aveilableWinCombinations[player].forEach((comb) => {
      const reg = new RegExp(`[^${comb}]`, "g");
      const match = sortMoves.replace(reg, "");
      if (comb === match) alert("Выигрыш Игрока " + player);
    });
  }

  checkAveilableMoves() {
    if (this.state.makedMoves.join("").length >= this.state.makedMoves.length) {
      alert("Ходить больше некуда! Ничья!");
      this.resetArena();
    }
  }

  changePlayer() {
    this.setState(({ move }) => ({ move: move === "X" ? "O" : "X" }));
  }

  resetArena() {
    this.setState({ move: "X", makedMoves: Array(9).fill(null) });
  }

  makeMove = (boxIndex) => {
    if (this.state.makedMoves[boxIndex]) {
      console.log("Так нельзя!");
      return;
    }

    this.setState(({ makedMoves }) => {
      makedMoves[boxIndex] = this.state.move;
      return { makedMoves };
    });

    setTimeout(() => {
      const player = this.state.move;

      const playerMoves = players.updatePlayerMoves(player, boxIndex);
      if (playerMoves.length >= 3) this.checkWinner(player, playerMoves);

      aveilableWinCombinations.handleCombinations(this.state.move, boxIndex);

      this.checkAveilableMoves();

      this.changePlayer();
    });
  };

  render() {
    return (
      <div className="game__play-stage">
        {this.state.makedMoves.map((playerMark, boxIndex) => (
          <PlayBox
            key={boxIndex}
            getMark={() => this.makeMove(boxIndex)}
            mark={playerMark}
          />
        ))}
      </div>
    );
  }
}
