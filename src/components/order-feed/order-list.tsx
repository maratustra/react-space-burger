import styles from "./order-list.module.css";
import OrderBlock from "../order-block/order-block";
import { IIngredient } from "../../types";

interface Order {
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  burgerName: string;
  burgerPrice: number;
  ingredients: IIngredient[];
  status: string;
}

interface OrderListProps {
  orders: Order[];
  title?: string;
  allIngredientsData: IIngredient[];
}

const OrderListPage: React.FC<OrderListProps> = ({
  title,
  orders = [],
  allIngredientsData,
}) => {
  const sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className={styles["burger-ingredients"]}>
      {title && <p className="text text_type_main-large pt-10 pb-5">{title}</p>}
      <ul className={`${styles["ingredients-list"]} mt-6 mb-15 pl-0`}>
        {sortedOrders?.map((order) => (
          <li key={order.number}>
            <OrderBlock
              orderNumber={order.number}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
              name={order.name}
              ingredients={order.ingredients}
              allIngredientsData={allIngredientsData}
              status={order.status}
              isProfileOrders={!title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrderListPage;
