import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../services/actions/auth";
import Loader from "../../components/loader";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    dispatch(login(email, password))
      .then((res) => {
        if (res.success) {
          navigate('/');
        } else {
          setErrorMessage('Неправильная почта или пароль');
        }
      })
      .catch((err) => setErrorMessage('Неправильная почта или пароль'));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Вход</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            placeholder="E-mail"
          />
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={"password"}
            placeholder="Пароль"
          />
          {errorMessage && <p className='input__error text_type_main-default'>{errorMessage}</p>}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={loading}
          >
            {loading ? <Loader /> : "Войти"}
          </Button>
        </form>
        <div className={`${styles["footer-links"]}`}>
          <div className={styles.links}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Link to="/registration" className={styles.link}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={styles.links}>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Link to="/forgot-password" className={styles.link}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
