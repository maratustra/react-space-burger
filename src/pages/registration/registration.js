import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./registration.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from '../../services/actions/auth';

function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(email, password, name)).then(() => navigate('/'));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Регистрация</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChangeName}
            value={name}
            name={"name"}
            ref={inputRef}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;
