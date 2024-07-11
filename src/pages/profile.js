import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfilePage() {
  const [name, setName] = useState("Марк");
  const [login, setLogin] = useState("mail@stellar.burgers");
  const [password, setPassword] = useState("password");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.navContainer}>
        <ul className={styles.navLinks}>
          <li
            className={`${styles.navLink} ${styles.activeLink} text text_type_main-medium`}
          >
            Профиль
          </li>
          <li className={`${styles.navLink} text text_type_main-medium`}>
            История заказов
          </li>
          <li className={`${styles.navLink} text text_type_main-medium`}>
            Выход
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChangeName}
            value={name}
            name={"name"}
            icon={'EditIcon'}
          />
          <EmailInput
            onChange={onChangeLogin}
            value={login}
            name={"login"}
            placeholder="Логин"
            isIcon={true}
          />
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={"password"}
            placeholder="Пароль"
            icon="EditIcon"
          />
        </form>
      </div>
    </main>
  );
}

export default ProfilePage;
