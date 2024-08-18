import styles from "./blocks.module.css";
import OrderBlock from "../order-block/order-block";

const BlocksPage: React.FC = () => {
  return (
    <section className={styles["burger-ingredients"]}>
      <p className="text text_type_main-large pt-10 pb-5">Лента заказов</p>
      <ul className={`${styles["ingredients-list"]} mt-6 mb-15 pl-0`}>
        <li>
          <OrderBlock />
        </li>
        <li>
          <OrderBlock />
        </li>
        <li>
          <OrderBlock />
        </li>
        <li>
          <OrderBlock />
        </li>
        <li>
          <OrderBlock />
        </li>
        <li>
          <OrderBlock />
        </li>
        <li>
          <OrderBlock />
        </li>
      </ul>
    </section>
  );
};

export default BlocksPage;
