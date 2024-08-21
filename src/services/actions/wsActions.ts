import {
  ORDER_FEED_WS_CONNECT,
  ORDER_FEED_WS_DISCONNECT,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_HISTORY_WS_CONNECT,
  ORDER_HISTORY_WS_DISCONNECT,
  ORDER_HISTORY_WS_CONNECTING,
  ORDER_HISTORY_WS_OPEN,
  ORDER_HISTORY_WS_CLOSE,
  ORDER_HISTORY_WS_ERROR,
  ORDER_HISTORY_WS_MESSAGE,
} from "../constants/wsConstants";

interface OrderFeedWsConnectAction {
  type: typeof ORDER_FEED_WS_CONNECT;
  payload: string;
}
interface OrderFeedWsDisconnectAction {
  type: typeof ORDER_FEED_WS_DISCONNECT;
  payload: string;
}
interface OrderFeedWsConnectingAction {
  type: typeof ORDER_FEED_WS_CONNECTING;
  payload: string;
}
interface OrderFeedWsOpenAction {
  type: typeof ORDER_FEED_WS_OPEN;
  payload: string;
}
interface OrderFeedWsCloseAction {
  type: typeof ORDER_FEED_WS_CLOSE;
  payload: string;
}
interface OrderFeedWsErrorAction {
  type: typeof ORDER_FEED_WS_ERROR;
  payload: string;
}
interface OrderFeedWsMessageAction {
  type: typeof ORDER_FEED_WS_MESSAGE;
  payload: any;
}

export type OrderFeedWsActions =
  | OrderFeedWsConnectAction
  | OrderFeedWsDisconnectAction
  | OrderFeedWsConnectingAction
  | OrderFeedWsOpenAction
  | OrderFeedWsCloseAction
  | OrderFeedWsErrorAction
  | OrderFeedWsMessageAction;

interface OrderHistoryWsConnectAction {
  type: typeof ORDER_HISTORY_WS_CONNECT;
  payload: string;
}

interface OrderHistoryWsDisconnectAction {
  type: typeof ORDER_HISTORY_WS_DISCONNECT;
  payload: string;
}

interface OrderHistoryWsConnectingAction {
  type: typeof ORDER_HISTORY_WS_CONNECTING;
  payload: string;
}

interface OrderHistoryWsOpenAction {
  type: typeof ORDER_HISTORY_WS_OPEN;
  payload: string;
}

interface OrderHistoryWsCloseAction {
  type: typeof ORDER_HISTORY_WS_CLOSE;
  payload: string;
}

interface OrderHistoryWsErrorAction {
  type: typeof ORDER_HISTORY_WS_ERROR;
  payload: string;
}

interface OrderHistoryWsMessageAction {
  type: typeof ORDER_HISTORY_WS_MESSAGE;
  payload: any;
}

export type OrderHistoryWsActions =
  | OrderHistoryWsConnectAction
  | OrderHistoryWsDisconnectAction
  | OrderHistoryWsConnectingAction
  | OrderHistoryWsOpenAction
  | OrderHistoryWsCloseAction
  | OrderHistoryWsErrorAction
  | OrderHistoryWsMessageAction;

export const orderFeedWsConnect = (url: string) => ({
  type: ORDER_FEED_WS_CONNECT,
  payload: url,
});

export const orderFeedWsDisconnect = () => ({
  type: ORDER_FEED_WS_DISCONNECT,
});

export const orderFeedWsConnecting = () => ({
  type: ORDER_FEED_WS_CONNECTING,
});

export const orderFeedWsOpen = () => ({
  type: ORDER_FEED_WS_OPEN,
});

export const orderFeedWsClose = () => ({
  type: ORDER_FEED_WS_CLOSE,
});

export const orderFeedWsError = (error: string) => ({
  type: ORDER_FEED_WS_ERROR,
  payload: error,
});

export const orderFeedWsMessage = (message: any) => ({
  type: ORDER_FEED_WS_MESSAGE,
  payload: message,
});

export const orderHistoryWsConnect = (url: string) => ({
  type: ORDER_HISTORY_WS_CONNECT,
  payload: url,
});

export const orderHistoryWsDisconnect = () => ({
  type: ORDER_HISTORY_WS_DISCONNECT,
});

export const orderHistoryWsConnecting = () => ({
  type: ORDER_HISTORY_WS_CONNECTING,
});

export const orderHistoryWsOpen = () => ({
  type: ORDER_HISTORY_WS_OPEN,
});

export const orderHistoryWsClose = () => ({
  type: ORDER_HISTORY_WS_CLOSE,
});

export const orderHistoryWsError = (error: string) => ({
  type: ORDER_HISTORY_WS_ERROR,
  payload: error,
});

export const orderHistoryWsMessage = (message: any) => ({
  type: ORDER_HISTORY_WS_MESSAGE,
  payload: message,
});
