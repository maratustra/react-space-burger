import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  UPDATE_ORDER_TOTAL
} from "../actions/order";

const initialState = {
  orderNumber: null,
  orderTotal: 0,
  isLoading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
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
    case UPDATE_ORDER_TOTAL:
      return {
        ...state,
        orderTotal: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
