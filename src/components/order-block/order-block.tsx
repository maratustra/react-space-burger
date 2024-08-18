import styles from "./order-block.module.css";
import {
  Counter,
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderBlock: React.FC = () => {
  const today = new Date();

  return (
    <div className={styles.orderBlock}>
      <div className={styles.orderInfo}>
        <p className="text text_type_digits-default">#034533</p>
        <FormattedDate
          date={
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
              today.getHours(),
              today.getMinutes() - 1,
              0
            )
          }
          className={styles.timeStamp}
        />
      </div>
      <p className="text text_type_main-medium">
        Death Star Starship Main бургер
      </p>
      <div className={styles.ingredientsSection}>
        <div className={styles.ingredients}>
          <div className={styles.ingredient}>{/* First icon */}</div>
          <div className={styles.ingredient}>{/* Second icon */}</div>
          <div className={styles.ingredient}>{/* Third icon */}</div>
          <div className={styles.ingredient}>{/* Fourth icon */}</div>
          <div className={styles.ingredient}>{/* Fifth icon */}</div>
        </div>
        <div className={styles["total-price"]}>
          <Counter count={370} size="default" extraClass={styles.counter} />
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderBlock;
