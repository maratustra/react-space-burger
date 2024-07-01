import { createOrder } from "../../utils/api";
import { openModal } from "./modal";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";

export const UPDATE_ORDER_TOTAL = "UPDATE_ORDER_TOTAL";

export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });

export const createOrderSuccess = (orderNumber) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: orderNumber,
});

export const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

export const updateOrderTotal = () => (dispatch, getState) => {
  const ingredients = getState().ingredients.constructorIngredients;
  const total = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  dispatch({ type: UPDATE_ORDER_TOTAL, payload: total });
};

export const sendOrder = (ingredients) => (dispatch) => {
  dispatch(createOrderRequest());
  createOrder(ingredients)
    .then((orderNumber) => {
      console.log('### 1 orderNumber: ', orderNumber);
      dispatch(createOrderSuccess(orderNumber));
      dispatch(openModal("orderDetails", {}, "Номер заказа"));
    })
    .catch((error) => {
      dispatch(createOrderFailure(error.message));
    });
};