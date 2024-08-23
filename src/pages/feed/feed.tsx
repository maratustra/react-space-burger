import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  orderFeedWsConnect, orderFeedWsDisconnect
} from "../../services/actions/wsActions";
import { LIVE_TABLE_SERVER_URL } from "../../utils/apiClient";
import OrderListPage from "../../components/order-feed/order-list";
import CalculationsPage from "../../components/order-feed/calculations";
import { type IOrder } from "../../types";

const OrderFeedPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(
    (state) => state.orderFeed.messages.slice(-1)[0]?.orders || []
  );
  const total = useAppSelector(
    (state) => state.orderFeed.messages.slice(-1)[0]?.total || 0
  );
  const totalToday = useAppSelector(
    (state) => state.orderFeed.messages.slice(-1)[0]?.totalToday ?? 0
  );
  const allIngredientsData = useAppSelector(
    (state) => state.ingredients.ingredients ?? []
  );
  const readyOrders: IOrder[] = orders.filter(
    (order: IOrder) => order.status === "done"
  );
  const inProgressOrders: IOrder[] = orders.filter(
    (order: IOrder) => order.status === "pending"
  );

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
      <CalculationsPage
        readyOrders={readyOrders}
        inProgressOrders={inProgressOrders}
        total={total}
        totalToday={totalToday}
      />
    </>
  );
};

export default OrderFeedPage;
