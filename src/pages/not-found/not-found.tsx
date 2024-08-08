import styles from "./not-found.module.css";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.illustration} />
        <h1 className={`${styles.title} text text_type_digits-large`}>404</h1>
        <p className={styles.message}>Страница не найдена</p>
        <Link
          to="/"
          className={`${styles.link} text text_type_main-default text_color_inactive`}
        >
          Вернуться на главную страницу
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
