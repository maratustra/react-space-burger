import styles from "./calculations.module.css";
import { type IOrder } from "../../types";

interface ICalculationsPageProps {
  total: number;
  totalToday: number;
  readyOrders: IOrder[];
  inProgressOrders: IOrder[];
}

const CalculationsPage: React.FC<ICalculationsPageProps> = ({
  readyOrders = [],
  inProgressOrders = [],
  total,
  totalToday,
}) => {
  const getLastOrders = (
    orders: IOrder[],
    maxColumns: number,
    maxItems: number
  ) => {
    const lastOrders = orders?.slice(-maxColumns * maxItems).reverse();
    const columns = [];
    for (let i = 0; i < maxColumns; i++) {
      columns.push(lastOrders.slice(i * maxItems, (i + 1) * maxItems));
    }
    return columns;
  };

  const readyOrderColumns = getLastOrders(readyOrders, 2, 7);
  const inProgressOrderColumns = getLastOrders(inProgressOrders, 2, 7);

  return (
    <section className={styles.statisticsContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.orderSummary}>
          <div className={styles.orderSection}>
            <p className="text text_type_main-medium">Готовы:</p>
            <div className={styles.columns}>
              {readyOrderColumns.map((column, index) => (
                <ul key={index} className={styles.orderList}>
                  {column.map((order) => (
                    <li key={order._id} className={styles.orderItem}>
                      <p className="text text_type_digits-default">
                        {order.number}
                      </p>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className={styles.orderSection}>
            <p className="text text_type_main-medium">В работе:</p>
            <div className={styles.columns}>
              {inProgressOrderColumns.map((column, index) => (
                <ul key={index} className={styles.orderList}>
                  {column.map((order) => (
                    <li key={order._id} className={styles.orderItem}>
                      <p className="text text_type_digits-default">
                        {order.number}
                      </p>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.totalSummary}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={styles.dailySummary}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </section>
  );
};

export default CalculationsPage;
