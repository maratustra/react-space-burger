import { useNavigate } from "react-router-dom";
import styles from "./order-block.module.css";
import {
  Counter,
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../types";

interface OrderBlockProps {
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  allIngredientsData?: IIngredient[];
  ingredients: string[];
}

const OrderBlock: React.FC<OrderBlockProps> = ({
  orderNumber,
  createdAt,
  updatedAt,
  status,
  ingredients,
  allIngredientsData
}) => {
  const navigate = useNavigate();

  const maxVisibleIngredients = 4;
  const remainingCount = ingredients.length - maxVisibleIngredients;

  const handleClick = () => {
    navigate(`/feed/${orderNumber}`);
  };

  const ingredientDetails = ingredients.map(ingredientId => 
    allIngredientsData?.find(ingredient => ingredient._id === ingredientId)
  ).filter(Boolean) as IIngredient[];

  const burgerPrice = ingredientDetails.reduce((total, ingredient) => total + ingredient.price, 0);

  return (
    <div className={styles.orderBlock} onClick={handleClick}>
      <div className={styles.orderInfo}>
        <p className="text text_type_digits-default">#{orderNumber}</p>
        <FormattedDate
          date={new Date(createdAt)}
          className={styles.timeStamp}
        />
      </div>
      <p className="text text_type_main-medium">Название бургера</p>
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
              {/* <img src={ingredient.image} alt={ingredient.name} /> */}
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
