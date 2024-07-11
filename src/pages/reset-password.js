import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./forgot.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPasswordPage() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form className={styles.form}>
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={"password"}
            placeholder="Введите новый пароль"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChangeCode}
            value={code}
            name={"code"}
          />
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
