import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from "../../services/actions/auth";
import Loader from "../../components/loader";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    dispatch(login(email, password))
      .then((res) => {
        if (res.success) {
          navigate('/');
        } else {
          setErrorMessage('Wrong email or password');
        }
      })
      .catch(() => setErrorMessage('Wrong email or password'));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Sign in</p>
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
            placeholder="Password"
          />
          {errorMessage && <p className='input__error text_type_main-default'>{errorMessage}</p>}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={loading}
          >
            {loading ? <Loader /> : "Sign in"}
          </Button>
        </form>
        <div className={`${styles["footer-links"]}`}>
          <div className={styles.links}>
            <p className="text text_type_main-default text_color_inactive">
              New here?
            </p>
            <Link to="/registration" className={styles.link}>
              Sign up
            </Link>
          </div>
          <div className={styles.links}>
            <p className="text text_type_main-default text_color_inactive">
              Forgot password?
            </p>
            <Link to="/forgot-password" className={styles.link}>
              Reset password
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
