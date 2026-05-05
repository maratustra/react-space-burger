import { useAppSelector } from "../../services/store";
import styles from "./order-details.module.css";

import acceptedPic from "../../images/order_accpeted.svg";

const OrderDetails: React.FC = () => {
  const orderNumber = useAppSelector((state) => state.order.orderNumber);
  
  return (
    <div className={`${styles["order-details"]} pt-4`}>
      <span
        data-testid="order-number"
        className={`${styles["order-counter"]} text text_type_main-large mb-8`}
      >
        {orderNumber}
      </span>
      <p className="text text_type_main-medium">order ID</p>

      <div className={`${styles["accepted-icon"]} mt-15 mb-15`}>
        <img src={acceptedPic} alt="Order accepted" />
      </div>
      <span
        className={`${styles["order-status"]} text text_type_main-small mb-2`}
      >
        Your order is being prepared
      </span>
      <span className={`${styles["order-message"]} text text_type_main-small`}>
        Wait for it on the orbital station
      </span>
    </div>
  );
};

export default OrderDetails;
