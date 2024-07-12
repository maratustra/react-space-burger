import { useState } from "react";
import styles from "./profile-form.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileFormPage() {
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
    <div className={styles["form-container"]}>
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
  )
}

export default ProfileFormPage;