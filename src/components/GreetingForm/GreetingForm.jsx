import { useState } from "react";

export default function GreetingForm({ onHandleForm }) {
  const [namePlayerX, setNamePlayerX] = useState("");
  const [namePlayerO, setNamePlayerO] = useState("");

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

  const disabled = !(namePlayerX.trim() && namePlayerO.trim());

  return (
    <form className="greeting-form" autoComplete="off" onSubmit={submitForm}>
      <label className="greeting-form__label">
        <span>Введите имя первого игрока</span>
        <input
          className="greeting-form__input"
          type="text"
          name="namePlayerX"
          onChange={handleChange}
          value={namePlayerX}
          required
        />
      </label>

      <label className="greeting-form__label">
        <span>Введите имя второго игрока</span>
        <input
          className="greeting-form__input"
          type="text"
          name="namePlayerO"
          onChange={handleChange}
          value={namePlayerO}
          required
        />
      </label>

      <button
        type="submit"
        className="button greeting-form__submit-btn"
        disabled={disabled}
      >
        Начать игру
      </button>
    </form>
  );
}
