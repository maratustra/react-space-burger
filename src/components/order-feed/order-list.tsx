import styles from "./order-list.module.css";
import OrderBlock from "../order-block/order-block";
import data from "../../utils/data.json";
import { IIngredient } from "../../types";

interface Order {
  orderNumber: string;
  completionDate: string;
  burgerName: string;
  burgerPrice: number;
  ingredients: IIngredient[];
}

interface OrderListProps {
  orders?: Order[];
  title?: string;
  allIngredientsData: IIngredient[];
}

const OrderListPage: React.FC<OrderListProps> = ({ title, allIngredientsData }) => {
  return (
    <section className={styles["burger-ingredients"]}>
      {title && <p className="text text_type_main-large pt-10 pb-5">{title}</p>}
      <ul className={`${styles["ingredients-list"]} mt-6 mb-15 pl-0`}>
        {data.orders.map((order) => (
          <li key={order.number}>
            {/* <OrderBlock
              orderNumber={order.number}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
              status={order.status}
              ingredients={order.ingredients}
              allIngredientsData={allIngredientsData}
            /> */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrderListPage;
