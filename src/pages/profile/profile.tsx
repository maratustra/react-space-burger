import { useAppDispatch } from "../../services/store";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./profile.module.css";
import { logout } from "../../services/actions/auth";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isOrderDetailsPage = location.pathname.match(/\/profile\/orders\/\d+/);

  return (
    <main className={styles.wrapper}>
      <div
        className={`${styles["nav-container"]} ${
          isOrderDetailsPage ? styles.hidden : ""
        }`}
      >
        <ul className={styles["nav-links"]}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${styles["nav-link"]} text text_type_main-medium ${
                isActive ? styles.active : ""
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `${styles["nav-link"]} text text_type_main-medium ${
                isActive ? styles.active : ""
              }`
            }
          >
            Order history
          </NavLink>
          <li
            className={`${styles["nav-link"]} text text_type_main-medium`}
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          In this section you can update your personal information
        </p>
      </div>

      <Outlet />
    </main>
  );
};

export default ProfilePage;
