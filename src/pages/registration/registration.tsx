import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
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

const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { loading } = useAppSelector((state) => state.user);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      .catch(() => setErrorMessage("Ошибка регистрации"));
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
