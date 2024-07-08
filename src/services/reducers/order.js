import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE
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
    default:
      return state;
  }
};

export default orderReducer;
