import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails, fetchIngredients } from "../../utils/api";
import styles from "./order-info.module.css";
import Loader from "../loader";
import { type IIngredient, type IOrder } from "../../types";
import {
  Counter,
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientWithCount extends IIngredient {
  count: number;
}

const OrderInfoPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [ingredientsData, setIngredientsData] = useState<IIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const [orderDetails, allIngredients] = await Promise.all([
          getOrderDetails(number ?? ""),
          fetchIngredients(),
        ]);

        setOrder(orderDetails);
        setIngredientsData(allIngredients);
      } catch (err) {
        setError("Ошибка загрузки данных заказа");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [number]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Заказ не найден</p>;
  }

  const ingredientDetails = order.ingredients
    .map((id) => ingredientsData.find((ingredient) => ingredient._id === id))
    .filter(Boolean) as IIngredient[];

  const groupedIngredients = ingredientDetails.reduce(
    (acc: IngredientWithCount[], ingredient) => {
      const existing = acc.find((item) => item._id === ingredient._id);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ ...ingredient, count: 1 });
      }
      return acc;
    },
    []
  );

  const totalPrice = groupedIngredients.reduce(
    (total, ingredient) => total + ingredient.price * ingredient.count,
    0
  );

  const renderStatus = () => {
    switch (order.status) {
      case "done":
        return (
          <p
            className={`${styles.status} text text_type_main-default text_color_success`}
          >
            Выполнен
          </p>
        );
      case "pending":
        return (
          <p
            className={`${styles.status} text text_type_main-default text_color_inactive`}
          >
            Готовится
          </p>
        );
      case "created":
        return (
          <p
            className={`${styles.status} text text_type_main-default text_color_inactive`}
          >
            Создан
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.orderDetails}>
      <div>
        <p className={`${styles.orderNumber} text text_type_digits-default`}>
          #{order.number}
        </p>
        <p className={`${styles.orderName} text text_type_main-medium`}>
          {order.name}
        </p>
        {order.status && renderStatus()}
      </div>

      <div>
        <p className={`${styles.orderName} text text_type_main-medium`}>
          Состав:
        </p>
        <div className={styles.ingredientsList}>
          {groupedIngredients.map((ingredient) => (
            <div key={ingredient._id} className={styles.ingredientRow}>
              <div className={styles.ingredientImageWrapper}>
                <img
                  className={styles.ingredientImage}
                  src={ingredient.image}
                  alt={ingredient.name}
                />
              </div>
              <p
                className={`${styles.ingredientName} text text_type_main-small`}
              >
                {ingredient.name}
              </p>
              <p
                className={`${styles.ingredientCount} text text_type_digits-default`}
              >
                {ingredient.count} x {ingredient.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles["bottom"]}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={styles.timeStamp}
        />
        <div className={styles["total-price"]}>
          <Counter
            count={totalPrice}
            size="default"
            extraClass={styles.counter}
          />
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfoPage;
