import { TOrderActions } from "../actions/order";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE
} from "../constants/order";

export type TOrderState = {
  orderNumber: number | null;
  orderTotal: number;
  isLoading: boolean;
  error: string | null;
}

export const initialState: TOrderState = {
  orderNumber: null,
  orderTotal: 0,
  isLoading: false,
  error: null,
};

const orderReducer = (state: TOrderState = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderNumber: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        orderNumber: null,
      };
    default:
      return state;
  }
};

export default orderReducer;
