import orderReducer, { TOrderState } from '../reducers/order';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE
} from '../constants/order';

describe('orderReducer', () => {
  const initialState: TOrderState = {
    orderNumber: null,
    orderTotal: 0,
    isLoading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialState);
  });

  test('should handle CREATE_ORDER_REQUEST', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null,
    };

    expect(orderReducer(initialState, { type: CREATE_ORDER_REQUEST })).toEqual(expectedState);
  });

  test('should handle CREATE_ORDER_SUCCESS', () => {
    const orderNumber = 12345;
    const action = { type: CREATE_ORDER_SUCCESS, payload: orderNumber };
    const expectedState = {
      ...initialState,
      isLoading: false,
      orderNumber: orderNumber,
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle CREATE_ORDER_FAILURE', () => {
    const error = 'Failed to create order';
    const action = { type: CREATE_ORDER_FAILURE, payload: error };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error,
      orderNumber: null,
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });
});