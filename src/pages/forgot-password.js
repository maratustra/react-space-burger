import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgot.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../utils/api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('e: ', e);
    e.preventDefault();
    setLoading(true);
    resetPassword(email)
      .then(() => {
        setLoading(false);
        navigate("/reset-password");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        // TODO: добавить обработку ошибок
      });
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            placeholder="Укажите e-mail"
          />
          <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
            {loading ? "Загрузка..." : "Восстановить"}
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
