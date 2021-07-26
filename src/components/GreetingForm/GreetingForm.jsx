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
          type="text"
          name="namePlayerO"
          onChange={handleChange}
          value={namePlayerO}
          required
        />
      </label>

      <button
        type="submit"
        className="greeting-form__submit-btn"
        disabled={disabled}
      >
        Начать игру
      </button>
    </form>
  );
}

//   return (
//     <div>
//       <h1>Greeting form</h1>
//       <button type="button" onClick={onHandleForm}>
//         Начать игру
//       </button>
//     </div>
//   );

// import useLocalStorage from '../../hooks/useLocalStorage';
// import styles from './SignupForm.module.css';

// export default function SignupForm() {
//   const [email, setEmail] = useLocalStorage('email', '');
//   const [password, setPassword] = useLocalStorage('password', '');

//   const handleChange = event => {
//     const { name, value } = event.target;

//     switch (name) {
//       case 'email':
//         setEmail(value);
//         break;

//       case 'password':
//         setPassword(value);
//         break;

//       default:
//         return;
//     }
//   };

//   return (
//     <form className={styles.form} autoComplete="off">
//       <label className={styles.label}>
//         <span>Почта</span>
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           value={email}
//         />
//       </label>

//       <label className={styles.label}>
//         <span>Пароль</span>
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={password}
//         />
//       </label>

//       <button type="submit">Зарегистрироваться</button>
//     </form>
//   );
// }
