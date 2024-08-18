import styles from "./calculations.module.css";

const CalculationsPage = () => {
  return (
    <section className={styles.statisticsContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.orderSummary}>
          <div className={styles.orderSection}>
            <p className="text text_type_main-medium">Готовы:</p>
            <ul className={styles.orderList}>
              <li className={styles.orderItem}>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li className={styles.orderItem}>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li className={styles.orderItem}>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li className={styles.orderItem}>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li className={styles.orderItem}>
                <p className="text text_type_digits-default">034533</p>
              </li>
            </ul>
          </div>
          <div className={styles.orderSection}>
            <p className="text text_type_main-medium">В работе:</p>
            <ul className={styles.orderList}>
              <li>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034533</p>
              </li>
              <li>
                <p className="text text_type_digits-default">034533</p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.totalSummary}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">28 752</p>
        </div>
        <div className={styles.dailySummary}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">138</p>
        </div>
      </div>
    </section>
  );
};

export default CalculationsPage;
