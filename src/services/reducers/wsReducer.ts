import {
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_HISTORY_WS_OPEN,
  ORDER_HISTORY_WS_CLOSE,
  ORDER_HISTORY_WS_ERROR,
  ORDER_HISTORY_WS_MESSAGE,
} from "../constants/wsConstants";
import {
  TOrderFeedWsActions,
  TOrderHistoryWsActions,
} from "../actions/wsActions";

type WebSocketState = {
  wsConnected: boolean;
  messages: any[];
  error?: string;
};

export const initialFeedState: WebSocketState = {
  wsConnected: false,
  messages: [],
};

export const initialHistoryState: WebSocketState = {
  wsConnected: false,
  messages: [],
};

export const orderFeedWsReducer = (
  state = initialFeedState,
  action: TOrderFeedWsActions
): WebSocketState => {
  switch (action.type) {
    case ORDER_FEED_WS_OPEN:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    case ORDER_FEED_WS_CLOSE:
      return {
        ...state,
        wsConnected: false,
      };
    case ORDER_FEED_WS_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case ORDER_FEED_WS_MESSAGE:
      const newState = {
        ...state,
        messages: [...state.messages, action.payload],
      };
      return newState;
    default:
      return state;
  }
};

export const orderHistoryWsReducer = (
  state = initialHistoryState,
  action: TOrderHistoryWsActions
): WebSocketState => {
  switch (action.type) {
    case ORDER_HISTORY_WS_OPEN:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    case ORDER_HISTORY_WS_CLOSE:
      return {
        ...state,
        wsConnected: false,
      };
    case ORDER_HISTORY_WS_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case ORDER_HISTORY_WS_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
