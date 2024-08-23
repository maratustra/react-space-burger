import { useAppSelector } from "../../services/store";
import styles from "./order-details.module.css";

import acceptedPic from "../../images/order_accpeted.svg";

const OrderDetails: React.FC = () => {
  const orderNumber = useAppSelector((state) => state.order.orderNumber);
  
  return (
    <div className={`${styles["order-details"]} pt-4`}>
      <span
        className={`${styles["order-counter"]} text text_type_main-large mb-8`}
      >
        {orderNumber}
      </span>
      <p className="text text_type_main-medium">идентификатор заказа</p>

      <div className={`${styles["accepted-icon"]} mt-15 mb-15`}>
        <img src={acceptedPic} alt="Заказ принят" />
      </div>
      <span
        className={`${styles["order-status"]} text text_type_main-small mb-2`}
      >
        Ваш заказ начали готовить
      </span>
      <span className={`${styles["order-message"]} text text_type_main-small`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderDetails;
