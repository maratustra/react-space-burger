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

interface IOrderFeedWsConnectAction {
  type: typeof ORDER_FEED_WS_CONNECT;
  payload: string;
}
interface IOrderFeedWsDisconnectAction {
  type: typeof ORDER_FEED_WS_DISCONNECT;
}
interface IOrderFeedWsConnectingAction {
  type: typeof ORDER_FEED_WS_CONNECTING;
  payload: string;
}
interface IOrderFeedWsOpenAction {
  type: typeof ORDER_FEED_WS_OPEN;
  payload: string;
}
interface IOrderFeedWsCloseAction {
  type: typeof ORDER_FEED_WS_CLOSE;
  payload: string;
}
interface IOrderFeedWsErrorAction {
  type: typeof ORDER_FEED_WS_ERROR;
  payload: string;
}
interface IOrderFeedWsMessageAction {
  type: typeof ORDER_FEED_WS_MESSAGE;
  payload: any;
}

export type TOrderFeedWsActions =
  | IOrderFeedWsConnectAction
  | IOrderFeedWsDisconnectAction
  | IOrderFeedWsConnectingAction
  | IOrderFeedWsOpenAction
  | IOrderFeedWsCloseAction
  | IOrderFeedWsErrorAction
  | IOrderFeedWsMessageAction;

interface IOrderHistoryWsConnectAction {
  type: typeof ORDER_HISTORY_WS_CONNECT;
  payload: string;
}

interface IOrderHistoryWsDisconnectAction {
  type: typeof ORDER_HISTORY_WS_DISCONNECT;
}

interface IOrderHistoryWsConnectingAction {
  type: typeof ORDER_HISTORY_WS_CONNECTING;
  payload: string;
}

interface IOrderHistoryWsOpenAction {
  type: typeof ORDER_HISTORY_WS_OPEN;
  payload: string;
}

interface IOrderHistoryWsCloseAction {
  type: typeof ORDER_HISTORY_WS_CLOSE;
  payload: string;
}

interface IOrderHistoryWsErrorAction {
  type: typeof ORDER_HISTORY_WS_ERROR;
  payload: string;
}

interface IOrderHistoryWsMessageAction {
  type: typeof ORDER_HISTORY_WS_MESSAGE;
  payload: any;
}

export type TOrderHistoryWsActions =
  | IOrderHistoryWsConnectAction
  | IOrderHistoryWsDisconnectAction
  | IOrderHistoryWsConnectingAction
  | IOrderHistoryWsOpenAction
  | IOrderHistoryWsCloseAction
  | IOrderHistoryWsErrorAction
  | IOrderHistoryWsMessageAction;

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
