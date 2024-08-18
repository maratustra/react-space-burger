import styles from "./blocks.module.css";
import OrderBlock from "../order-block/order-block";
import data from "../../utils/data.json";

const BlocksPage: React.FC = () => {
  return (
    <section className={styles["burger-ingredients"]}>
      <p className="text text_type_main-large pt-10 pb-5">Лента заказов</p>
      <ul className={`${styles["ingredients-list"]} mt-6 mb-15 pl-0`}>
      {data.orders.map((order) => (
          <li key={order.orderNumber}>
            <OrderBlock
              orderNumber={order.orderNumber}
              completionDate={order.completionDate}
              burgerName={order.burgerName}
              burgerPrice={order.burgerPrice}
              ingredients={order.ingredients}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlocksPage;
