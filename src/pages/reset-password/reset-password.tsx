import { useState, ChangeEvent, FormEvent } from "react";
import { useAppSelector } from "../../services/store";
import { Link, useNavigate } from "react-router-dom";
import styles from "../forgot-password/forgot.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordWithToken } from "../../utils/api";
import Loader from "../../components/loader";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading } = useAppSelector((state) => state.user);

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    resetPasswordWithToken(password, code)
      .then((res) => {
        if (res.success) {
          setSuccessMessage(
            "Password reset successfully! Redirecting to the login page"
          );
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setErrorMessage("Password reset error");
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_main-medium">Reset password</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={"password"}
            placeholder="Enter new password"
          />
          <Input
            type={"text"}
            placeholder={"Enter code from the email"}
            onChange={onChangeCode}
            value={code}
            name={"code"}
          />
          {successMessage && <p className='input__error text_type_main-default'>{successMessage}</p>}
          {errorMessage && <p className='input__error text_type_main-default'>{errorMessage}</p>}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={loading}
          >
            {loading ? <Loader /> : "Save"}
          </Button>
        </form>

        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Remembered your password?
          </p>
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
