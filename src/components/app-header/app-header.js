import { Link } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Header() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles["nav-links"]}>
          <Link to="/" className={`${styles["nav-link"]} p-4`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </Link>
          <li className={styles["nav-link"]}>
            <ListIcon type="primary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </li>
        </ul>
        <Link to="/" className={styles["logo-container"]}>
          <Logo />
        </Link>
        <Link to="/profile" className={`${styles.account} p-4`}>
          <ProfileIcon type="primary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
