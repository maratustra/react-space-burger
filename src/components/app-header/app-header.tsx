import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Header: React.FC = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles["nav-links"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles["nav-link"]} p-4 ${isActive ? styles.active : ""}`
            }
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </NavLink>
          <li className={styles["nav-link"]}>
            <ListIcon type="primary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </li>
        </ul>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles["nav-link"]} p-4 ${isActive ? styles.active : ""}`
          }
        >
          <Logo />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles["nav-link"]} p-4 ${isActive ? styles.active : ""}`
          }
        >
          <ProfileIcon type="primary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
