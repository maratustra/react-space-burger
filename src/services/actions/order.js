import { createOrder } from "../../utils/api";
import { openModal } from "./modal";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";

export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });

export const createOrderSuccess = (orderNumber) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: orderNumber,
});

export const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

export const sendOrder = (ingredients) => (dispatch) => {
  dispatch(createOrderRequest());
  createOrder(ingredients)
    .then((orderNumber) => {
      dispatch(createOrderSuccess(orderNumber));
      dispatch(openModal("orderDetails", {}, null));
    })
    .catch((error) => {
      dispatch(createOrderFailure(error.message));
    });
};