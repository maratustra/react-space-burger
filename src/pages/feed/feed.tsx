import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import {
  orderFeedWsConnect,
  orderFeedWsDisconnect,
} from "../../services/actions/wsActions";
import { LIVE_TABLE_SERVER_URL } from "../../utils/apiClient";
import OrderListPage from "../../components/order-feed/order-list";
import CalculationsPage from "../../components/order-feed/calculations";
import {type IOrder} from "../../types";

const OrderFeedPage: React.FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state: RootState) => state.orderFeed.messages[0]?.orders || []
  );
  console.log('получаем и смотрим orders', orders);
  const total = useSelector(
    (state: RootState) => state.orderFeed.messages[0]?.total || 0
  );
  const totalToday = useSelector(
    (state: RootState) => state.orderFeed.messages[0]?.totalToday ?? 0
  );
  const allIngredientsData = useSelector(
    (state: RootState) => state.ingredients.ingredients ?? []
  );
  const readyOrders: IOrder[] = orders.filter((order: IOrder) => order.status === "done");
  const inProgressOrders: IOrder[] = orders.filter((order: IOrder) => order.status === "pending");
  console.log('inProgressOrders: ', inProgressOrders);

  useEffect(() => {
    dispatch(orderFeedWsConnect(LIVE_TABLE_SERVER_URL));

    return () => {
      dispatch(orderFeedWsDisconnect());
    };
  }, [dispatch]);

  return (
    <>
      <OrderListPage
        title="Лента заказов"
        orders={orders}
        allIngredientsData={allIngredientsData}
      />
      <CalculationsPage readyOrders={readyOrders} inProgressOrders={inProgressOrders} total={total} totalToday={totalToday} />
    </>
  );
};

export default OrderFeedPage;
