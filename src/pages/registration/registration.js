import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./registration.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from "../../services/actions/auth";
import Loader from "../../components/loader";

function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
    setSuccessMessage("");
    dispatch(register(email, password, name))
      .then((res) => {
        if (res.success) {
          setSuccessMessage(
            "Регистрация успешна! Перенаправляем на страницу входа"
          );
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setErrorMessage("Ошибка регистрации");
        }
      })
      .catch((err) => setErrorMessage("Ошибка регистрации"));
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
          {successMessage && <p className='input__error text_type_main-default'>{successMessage}</p>}
          {errorMessage && <p className='input__error text_type_main-default'>{errorMessage}</p>}

          <Button htmlType="submit" type="primary" size="medium">
            {loading ? <Loader /> : "Зарегистрироваться"}
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
