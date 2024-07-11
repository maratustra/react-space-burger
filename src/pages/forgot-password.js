import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./forgot.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form className={styles.form}>
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            placeholder="Укажите e-mail"
            extraClass="mb-2"
          />
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
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

export default ForgotPasswordPage;
