import OrderListPage from "../../components/order-feed/order-list";
import CalculationsPage from "../../components/order-feed/calcluations";

const OrderFeedPage: React.FC = () => {
  return (
    <>
      {/* <OrderListPage title="Лента заказов" /> */}
      <CalculationsPage />
    </>
  );
}

export default OrderFeedPage;
