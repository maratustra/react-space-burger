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
import { initialFeedState, initialHistoryState, orderFeedWsReducer, orderHistoryWsReducer } from './wsReducer';

describe('orderFeedWsReducer', () => {
  const webSocketUrl = 'wss://test/feed';

  test('should return the initial state', () => {
    expect(orderFeedWsReducer(undefined, {} as any)).toEqual(initialFeedState);
  });

  test('should handle ORDER_FEED_WS_OPEN', () => {
    const action = { type: ORDER_FEED_WS_OPEN, payload: webSocketUrl };
    const expectedState = {
      ...initialFeedState,
      wsConnected: true,
    };

    expect(orderFeedWsReducer(initialFeedState, action)).toEqual(expectedState);
  });

  test('should handle ORDER_FEED_WS_CLOSE', () => {
    const stateWithConnection = {
      ...initialFeedState,
      wsConnected: true,
    };
    const action = { type: ORDER_FEED_WS_CLOSE, payload: webSocketUrl };
    const expectedState = {
      ...initialFeedState,
      wsConnected: false,
    };

    expect(orderFeedWsReducer(stateWithConnection, action)).toEqual(expectedState);
  });

  test('should handle ORDER_FEED_WS_ERROR', () => {
    const error = 'WebSocket error';
    const action = { type: ORDER_FEED_WS_ERROR, payload: error };
    const expectedState = {
      ...initialFeedState,
      wsConnected: false,
      error: error,
    };

    expect(orderFeedWsReducer(initialFeedState, action)).toEqual(expectedState);
  });

  test('should handle ORDER_FEED_WS_MESSAGE', () => {
    const message = { data: 'test' };
    const action = { type: ORDER_FEED_WS_MESSAGE, payload: message };
    const expectedState = {
      ...initialFeedState,
      messages: [message],
    };

    expect(orderFeedWsReducer(initialFeedState, action)).toEqual(expectedState);
  });
});

describe('orderHistoryWsReducer', () => {
  const webSocketUrl = 'wss://test/feed';

  test('should return the initial state', () => {
    expect(orderHistoryWsReducer(undefined, {} as any)).toEqual(initialHistoryState);
  });

  test('should handle ORDER_HISTORY_WS_OPEN', () => {
    const action = { type: ORDER_HISTORY_WS_OPEN, payload: webSocketUrl };
    const expectedState = {
      ...initialHistoryState,
      wsConnected: true,
    };

    expect(orderHistoryWsReducer(initialHistoryState, action)).toEqual(expectedState);
  });

  test('should handle ORDER_HISTORY_WS_CLOSE', () => {
    const action = { type: ORDER_HISTORY_WS_CLOSE, payload: webSocketUrl };
    const stateWithConnection = {
      ...initialHistoryState,
      wsConnected: true,
    };
    const expectedState = {
      ...initialHistoryState,
      wsConnected: false,
    };

    expect(orderHistoryWsReducer(stateWithConnection, action)).toEqual(expectedState);
  });

  test('should handle ORDER_HISTORY_WS_ERROR', () => {
    const error = 'WebSocket error';
    const action = { type: ORDER_HISTORY_WS_ERROR, payload: error };
    const expectedState = {
      ...initialHistoryState,
      wsConnected: false,
      error: error,
    };

    expect(orderHistoryWsReducer(initialHistoryState, action)).toEqual(expectedState);
  });

  test('should handle ORDER_HISTORY_WS_MESSAGE', () => {
    const message = { data: 'test' };
    const action = { type: ORDER_HISTORY_WS_MESSAGE, payload: message };
    const expectedState = {
      ...initialHistoryState,
      messages: [message],
    };

    expect(orderHistoryWsReducer(initialHistoryState, action)).toEqual(expectedState);
  });
});