import { useState, useEffect } from "react";
import s from "./GreetingForm.module.css";

export default function GreetingForm({ onHandleForm }) {
  const [namePlayerX, setNamePlayerX] = useState("");
  const [namePlayerO, setNamePlayerO] = useState("");
  const [isStartBtnHovered, setIsStartBtnHovered] = useState(false);

  useEffect(() => {
    console.log(isStartBtnHovered && "Ховер начался");
    console.log(!isStartBtnHovered && "Ховер закончился");
  }, [isStartBtnHovered]);

  const inputTextFunctions = {
    namePlayerX: setNamePlayerX,
    namePlayerO: setNamePlayerO,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    inputTextFunctions[name](value);
  };

  function submitForm(e) {
    e.preventDefault();
    onHandleForm({
      X: namePlayerX,
      O: namePlayerO,
    });
  }

  function buttonHoveHandler(e) {}

  const disabled = !(namePlayerX.trim() && namePlayerO.trim());

  return (
    <form className={s.form} autoComplete="off" onSubmit={submitForm}>
      <label className={s.label}>
        <span>Введите имя первого игрока</span>
        <input
          className={s.input}
          type="text"
          name="namePlayerX"
          onChange={handleChange}
          value={namePlayerX}
          laceholder="Type the name of player 1"
          required
        />
      </label>

      <label className={s.label}>
        <span>Введите имя второго игрока</span>
        <input
          className={s.input}
          type="text"
          name="namePlayerO"
          onChange={handleChange}
          value={namePlayerO}
          required
        />
      </label>

      <button
        onMouseEnter={() => {
          console.log("ховер начался");
          //setIsStartBtnHovered((prev) => !prev);
        }}
        onMouseLeave={() => {
          console.log("Ховер закончился");
          // setIsStartBtnHovered((prev) => !prev);
        }}
        type="submit"
        className={s.submit}
      >
        Начать игру
      </button>
    </form>
  );
}
