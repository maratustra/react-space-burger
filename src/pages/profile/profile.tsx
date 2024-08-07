import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import { logout } from '../../services/actions/auth';

const ProfilePage: React.FC = () => {
  const dispatch: any = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles["nav-container"]}>
        <ul className={styles["nav-links"]}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) => `${styles["nav-link"]} text text_type_main-medium ${isActive ? styles.active : ""}`}
          >
            Профиль
          </NavLink>
          <NavLink 
            to="/profile/orders" 
            className={({ isActive }) => `${styles["nav-link"]} text text_type_main-medium ${isActive ? styles.active : ""}`}
          >
            История заказов
          </NavLink>
          <li 
            className={`${styles["nav-link"]} text text_type_main-medium`}
            onClick={handleLogout}
          >
            Выход
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </main>
  );
}

export default ProfilePage;
