import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  orderHistoryWsConnect,
  orderHistoryWsDisconnect,
} from "../../services/actions/wsActions";
import { USER_ORDER_SERVER_URL } from "../../utils/apiClient";
import OrderListPage from "../../components/order-feed/order-list";

const ProfileOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    
    if (token) {
      const url = new URL(USER_ORDER_SERVER_URL);
      url.searchParams.append("token", token);

      dispatch(orderHistoryWsConnect(url.toString()));
    }

    return () => {
      dispatch(orderHistoryWsDisconnect());
    };
  }, [dispatch]);

  const orders = useAppSelector(
    (state) => state.orderHistory.messages[0]?.orders
  );
  const allIngredientsData = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  return (
    <OrderListPage orders={orders} allIngredientsData={allIngredientsData} />
  );
};

export default ProfileOrdersPage;
