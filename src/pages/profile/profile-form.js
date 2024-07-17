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
import Loader from "../../components/loader";

function ProfileFormPage() {
  const dispatch = useDispatch();
  const { user, loading, updateSuccess, error } = useSelector(state => state.user);

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

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

  useEffect(() => {
    if (updateSuccess) {
      setSuccessMessage('Данные успешно изменены!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  }, [updateSuccess]);

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
          {successMessage && <p className='input__error text_type_main-default'>{successMessage}</p>}
          {error && <p className='input__error text_type_main-default'>{error}</p>}
          <Button htmlType="submit" type="primary" size="medium">
            {loading ? <Loader /> : 'Сохранить'}
          </Button>
        </form>
      </div>
  )
}

export default ProfileFormPage;