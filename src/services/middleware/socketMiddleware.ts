import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { RootState } from "../store";
import {
  ORDER_FEED_WS_CONNECT,
  ORDER_FEED_WS_DISCONNECT,
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_HISTORY_WS_CONNECT,
  ORDER_HISTORY_WS_DISCONNECT,
  ORDER_HISTORY_WS_OPEN,
  ORDER_HISTORY_WS_CLOSE,
  ORDER_HISTORY_WS_ERROR,
  ORDER_HISTORY_WS_MESSAGE,
} from "../constants/wsConstants";
import {
  OrderFeedWsActions,
  OrderHistoryWsActions,
} from "../actions/wsActions";

type TwsActions = {
  wsConnect: string;
  wsOpen: string;
  wsClose: string;
  wsDisconnect: string;
  wsError: string;
  wsMessage: string;
};

type WebSocketActions = OrderFeedWsActions | OrderHistoryWsActions;

export const createSocketMiddleware = (
  wsActions: TwsActions,
  withTokenRefresh: boolean
): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI<Dispatch<any>, RootState>) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let closing: boolean = false;

    return (next: Dispatch<WebSocketActions>) => (action: WebSocketActions) => {
      const { dispatch } = store;

      switch (action.type) {
        case wsActions.wsConnect:
          url = action.payload;
          socket = new WebSocket(action.payload);
          socket.onopen = () => dispatch({ type: wsActions.wsOpen });
          socket.onclose = () => dispatch({ type: wsActions.wsClose });
          socket.onerror = (event: Event) => {
            const errorMessage =
              (event as ErrorEvent).message || "Unknown error";
            dispatch({ type: wsActions.wsError, payload: errorMessage });
          };
          socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);

            if (
              withTokenRefresh &&
              parsedData.message === "Invalid or missing token"
            ) {
              // Получаем новый токен из localStorage
              const newAccessToken = localStorage.getItem("accessToken");
              if (newAccessToken) {
                const wssUrl = new URL(url!);
                wssUrl.searchParams.set(
                  "token",
                  newAccessToken.replace("Bearer ", "")
                );
                dispatch({
                  type: wsActions.wsConnect,
                  payload: wssUrl.toString(),
                });
              } else {
                console.error("Failed to retrieve new access token");
              }
            } else {
              dispatch({ type: wsActions.wsMessage, payload: parsedData });
            }
          };
          break;

        case wsActions.wsDisconnect:
          closing = true;
          if (socket) {
            socket.close();
          }
          break;

        default:
          break;
      }

      next(action);
    };
  };
};

export const feedSocketMiddleware = createSocketMiddleware({
  wsConnect: ORDER_FEED_WS_CONNECT,
  wsDisconnect: ORDER_FEED_WS_DISCONNECT,
  wsOpen: ORDER_FEED_WS_OPEN,
  wsClose: ORDER_FEED_WS_CLOSE,
  wsError: ORDER_FEED_WS_ERROR,
  wsMessage: ORDER_FEED_WS_MESSAGE,
}, true);

export const historySocketMiddleware = createSocketMiddleware({
  wsConnect: ORDER_HISTORY_WS_CONNECT,
  wsDisconnect: ORDER_HISTORY_WS_DISCONNECT,
  wsOpen: ORDER_HISTORY_WS_OPEN,
  wsClose: ORDER_HISTORY_WS_CLOSE,
  wsError: ORDER_HISTORY_WS_ERROR,
  wsMessage: ORDER_HISTORY_WS_MESSAGE,
}, true);
