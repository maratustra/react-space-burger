import styles from "./order-block.module.css";
import {
  Counter,
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface Ingredient {
  name: string;
  image: string;
}

interface OrderBlockProps {
  orderNumber: string;
  completionDate: string;
  burgerName: string;
  burgerPrice: number;
  ingredients: Ingredient[];
}

const OrderBlock: React.FC<OrderBlockProps> = ({
  orderNumber,
  completionDate,
  burgerName,
  burgerPrice,
  ingredients,
}) => {
  const maxVisibleIngredients = 4;
  const remainingCount = ingredients.length - maxVisibleIngredients;

  return (
    <div className={styles.orderBlock}>
      <div className={styles.orderInfo}>
        <p className="text text_type_digits-default">{orderNumber}</p>
        <FormattedDate
          date={new Date(completionDate)}
          className={styles.timeStamp}
        />
      </div>
      <p className="text text_type_main-medium">{burgerName}</p>
      <div className={styles.ingredientsSection}>
        <div className={styles.ingredients}>
          {ingredients.slice(0, maxVisibleIngredients).map((ingredient, index) => (
            <div
              key={index}
              className={styles.ingredient}
              style={{
                left: `${index * 55}px`,
                zIndex: maxVisibleIngredients - index,
              }}
            >
              <img src={ingredient.image} alt={ingredient.name} />
              {index === maxVisibleIngredients - 1 && remainingCount > 0 && (
                <div className={styles.remainingCount}>
                  <span>+{remainingCount}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles["total-price"]}>
          <Counter
            count={burgerPrice}
            size="default"
            extraClass={styles.counter}
          />
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderBlock;
