import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../forgot-password/forgot.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordWithToken } from "../../utils/api";

function ResetPasswordPage() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    resetPasswordWithToken(password, code)
      .then(() => {
        setLoading(false);
        navigate("/login");
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
          <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
            {loading ? "Загрузка..." : "Сохранить"}
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
