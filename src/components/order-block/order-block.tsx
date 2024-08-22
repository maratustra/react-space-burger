import { useNavigate, useLocation } from "react-router-dom";
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
  name: string;
  allIngredientsData: IIngredient[];
  ingredients: IIngredient[];
  status?: string,
  isProfileOrders?: boolean
}

const OrderBlock: React.FC<OrderBlockProps> = ({
  orderNumber,
  createdAt,
  updatedAt,
  name,
  ingredients,
  allIngredientsData,
  status,
  isProfileOrders = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const maxVisibleIngredients = 4;
  const remainingCount = ingredients.length - maxVisibleIngredients;

  const handleClick = () => {
    const basePath = isProfileOrders ? '/profile/orders' : '/feed';
    navigate(`${basePath}/${orderNumber}`, { state: { background: location } });
  };

  const ingredientDetails = ingredients
    .map((ingredientId) =>
      allIngredientsData?.find(
        (ingredient) => ingredient._id === ingredientId.toString()
      )
    )
    .filter(Boolean) as IIngredient[];

  const burgerPrice = ingredientDetails.reduce(
    (total, ingredient) => total + ingredient.price,
    0
  );

  const renderStatus = () => {
    switch (status) {
      case 'done':
        return <p className="text text_type_main-default text_color_success">Выполнен</p>;
      case 'pending':
        return <p className="text text_type_main-default text_color_inactive">Готовится</p>;
      case 'created':
        return <p className="text text_type_main-default text_color_inactive">Создан</p>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.orderBlock} onClick={handleClick}>
      <div className={styles.orderInfo}>
        <p className="text text_type_digits-default">#{orderNumber}</p>
        <FormattedDate
          date={new Date(createdAt)}
          className={styles.timeStamp}
        />
      </div>
      <p className={`${styles.orderName} text text_type_main-medium`}>{name}</p>
      {isProfileOrders && renderStatus()}
      <div className={styles.ingredientsSection}>
        <div className={styles.ingredients}>
          {ingredientDetails
            .slice(0, maxVisibleIngredients)
            .map((ingredient, index) => (
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
