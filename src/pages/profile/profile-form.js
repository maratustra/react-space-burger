import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./profile-form.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser, updateUser } from '../../services/actions/auth';

function ProfileFormPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setLogin(user.email ?? '');
      setPassword('');
    }
  }, [user]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(login, name, password));
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
            icon={'EditIcon'}
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
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
      </div>
  )
}

export default ProfileFormPage;