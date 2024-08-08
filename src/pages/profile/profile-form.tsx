import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile-form.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser, updateUser } from "../../services/actions/auth";
import Loader from "../../components/loader";

const ProfileFormPage: React.FC = () => {
  const dispatch: any = useDispatch();
  const { user, loading, updateSuccess, error } = useSelector(
    (state: any) => state.user
  );

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isModified, setIsModified] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setLogin(user.email ?? "");
      setPassword("");
      setIsModified(false);
    }
  }, [user]);

  useEffect(() => {
    if (updateSuccess) {
      setSuccessMessage("Данные успешно изменены!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [updateSuccess]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsModified(true);
  };

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    setIsModified(true);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsModified(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(login, name, password));
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name ?? "");
      setLogin(user.email ?? "");
      setPassword("");
      setIsModified(false);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          value={name}
          name={"name"}
          icon={"EditIcon"}
        />
        <EmailInput
          onChange={onChangeLogin}
          value={login}
          name={"login"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
          placeholder="Пароль"
          icon="EditIcon"
        />
        {successMessage && (
          <p className="input__error text_type_main-default">
            {successMessage}
          </p>
        )}
        {error && (
          <p className="input__error text_type_main-default">{error}</p>
        )}
        {isModified && (
          <div className={styles.buttons}>
            <Button htmlType="submit" type="primary" size="medium">
              {loading ? <Loader /> : "Сохранить"}
            </Button>

            <Button type="secondary" size="medium" onClick={handleCancel} htmlType={"submit"}>
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfileFormPage;
