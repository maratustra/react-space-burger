import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgot.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../utils/api";
import Loader from "../../components/loader";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const { loading, error } = useSelector((state) => state.user);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
      .then(() => {
        navigate("/reset-password");
      })
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
            {loading ? <Loader /> : "Восстановить"}
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
