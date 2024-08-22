import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderHistoryWsConnect,
  orderHistoryWsDisconnect,
} from "../../services/actions/wsActions";
import { USER_ORDER_SERVER_URL } from "../../utils/apiClient";
import { RootState } from "../../services/store";
import OrderListPage from "../../components/order-feed/order-list";

const ProfileOrdersPage: React.FC = () => {
  const dispatch = useDispatch();

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

  const orders = useSelector(
    (state: RootState) => state.orderHistory.messages[0]?.orders
  );
  const allIngredientsData = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  return (
    <OrderListPage orders={orders} allIngredientsData={allIngredientsData} />
  );
};

export default ProfileOrdersPage;
