import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from '../../services/actions/auth';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password)).then(() => navigate('/'));
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
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div className={styles.footerLinks}>
          <div className={styles.links}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Link
              to="/registration" 
              className={styles.link}>
                Зарегистрироваться
              </Link>
          </div>
          <div className={styles.links}>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Link 
              to="/forgot-password" 
              className={styles.link}
            >
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
