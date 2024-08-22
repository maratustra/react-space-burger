import { createOrder } from "../../utils/api";
import { openModal, closeModal } from "./modal";
import { CLEAR_CONSTRUCTOR } from "../constants/constructor";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from "../constants/order";
import { IIngredient } from "../../types/index";
import { AppThunk, AppDispatch } from "../store";

interface ICreateOrderRequestAction {
  type: typeof CREATE_ORDER_REQUEST;
}

interface ICreateOrderSuccessAction {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: number;
}

interface ICreateOrderFailureAction {
  type: typeof CREATE_ORDER_FAILURE;
  payload: string;
}

export type TOrderActions =
  | ICreateOrderRequestAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailureAction;

export const createOrderRequest = (): ICreateOrderRequestAction => ({
  type: CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = (
  orderNumber: number
): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  payload: orderNumber,
});

export const createOrderFailure = (
  error: string
): ICreateOrderFailureAction => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

export const sendOrder =
  (ingredients: IIngredient[]): AppThunk =>
  (dispatch: AppDispatch, getState) => {
    const { user } = getState().user;

    if (!user) {
      return;
    }

    dispatch(createOrderRequest());

    createOrder(ingredients)
      .then((orderNumber) => {
        dispatch(createOrderSuccess(orderNumber));
        dispatch(openModal("orderDetails", {}, ""));
        setTimeout(() => {
          dispatch(closeModal());
          dispatch({ type: CLEAR_CONSTRUCTOR });
        }, 3000);
      })
      .catch((error) => {
        dispatch(createOrderFailure(error.message));
      });
  };
