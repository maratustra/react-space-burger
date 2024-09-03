import {
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_HISTORY_WS_OPEN,
  ORDER_HISTORY_WS_CLOSE,
  ORDER_HISTORY_WS_ERROR,
  ORDER_HISTORY_WS_MESSAGE,
} from '../constants/wsConstants';
import { orderFeedWsReducer, orderHistoryWsReducer } from './wsReducer';

describe('orderFeedWsReducer', () => {
  const initialState = {
    wsConnected: false,
    messages: [],
    error: undefined,
  };

  const webSocketUrl = 'wss://test/feed';

  test('should return the initial state', () => {
    expect(orderFeedWsReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle ORDER_FEED_WS_OPEN', () => {
    const action = { type: ORDER_FEED_WS_OPEN, payload: webSocketUrl };
    const expectedState = {
      ...initialState,
      wsConnected: true,
    };

    expect(orderFeedWsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ORDER_FEED_WS_CLOSE', () => {
    const stateWithConnection = {
      ...initialState,
      wsConnected: true,
    };
    const action = { type: ORDER_FEED_WS_CLOSE, payload: webSocketUrl };
    const expectedState = {
      ...initialState,
      wsConnected: false,
    };

    expect(orderFeedWsReducer(stateWithConnection, action)).toEqual(expectedState);
  });

  test('should handle ORDER_FEED_WS_ERROR', () => {
    const error = 'WebSocket error';
    const action = { type: ORDER_FEED_WS_ERROR, payload: error };
    const expectedState = {
      ...initialState,
      wsConnected: false,
      error: error,
    };

    expect(orderFeedWsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ORDER_FEED_WS_MESSAGE', () => {
    const message = { data: 'test' };
    const action = { type: ORDER_FEED_WS_MESSAGE, payload: message };
    const expectedState = {
      ...initialState,
      messages: [message],
    };

    expect(orderFeedWsReducer(initialState, action)).toEqual(expectedState);
  });
});

describe('orderHistoryWsReducer', () => {
  const initialState = {
    wsConnected: false,
    messages: [],
    error: undefined,
  };

  test('should return the initial state', () => {
    expect(orderHistoryWsReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle ORDER_HISTORY_WS_OPEN', () => {
    const expectedState = {
      ...initialState,
      wsConnected: true,
    };

    expect(orderHistoryWsReducer(initialState, { type: ORDER_HISTORY_WS_OPEN })).toEqual(expectedState);
  });

  test('should handle ORDER_HISTORY_WS_CLOSE', () => {
    const stateWithConnection = {
      ...initialState,
      wsConnected: true,
    };
    const expectedState = {
      ...initialState,
      wsConnected: false,
    };

    expect(orderHistoryWsReducer(stateWithConnection, { type: ORDER_HISTORY_WS_CLOSE })).toEqual(expectedState);
  });

  test('should handle ORDER_HISTORY_WS_ERROR', () => {
    const error = 'WebSocket error';
    const action = { type: ORDER_HISTORY_WS_ERROR, payload: error };
    const expectedState = {
      ...initialState,
      wsConnected: false,
      error: error,
    };

    expect(orderHistoryWsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ORDER_HISTORY_WS_MESSAGE', () => {
    const message = { data: 'test' };
    const action = { type: ORDER_HISTORY_WS_MESSAGE, payload: message };
    const expectedState = {
      ...initialState,
      messages: [message],
    };

    expect(orderHistoryWsReducer(initialState, action)).toEqual(expectedState);
  });
});