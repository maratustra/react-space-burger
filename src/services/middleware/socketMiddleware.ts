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
import { refreshToken } from '../../utils/apiClient';

type TwsActions = {
  wsConnect: string;
  wsOpen: string;
  wsClose: string;
  wsDisconnect: string;
  wsError: string;
  wsMessage: string;
};

export const createSocketMiddleware = (
  wsActions: TwsActions,
  withTokenRefresh: boolean
): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI<Dispatch<any>, RootState>) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let closing: boolean = false;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsActions.wsConnect) {
        const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");

        if (typeof payload === 'string') {
          const urlObj = new URL(payload);
          
          if (token) {
            urlObj.searchParams.set('token', token);
          }
          url = urlObj.toString();
        } else {
          url = payload;
        }

        socket = new WebSocket(payload);

        socket.onopen = (event) => {
          dispatch({ type: wsActions.wsOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActions.wsError, payload: event });
        };

        socket.onmessage = async (event) => {
          const parsedData = JSON.parse(event.data);
          console.log("WebSocket message:", parsedData)

          console.log('withTokenRefresh', withTokenRefresh);
          console.log('parsedData.message', parsedData.message);
          if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
            try {
              const refreshData = await refreshToken();
              console.log('refreshData: ', refreshData);
              const newToken = refreshData.accessToken.replace('Bearer ', '');
              console.log('newToken: ', newToken);
              
              const urlObj = new URL(url!);
              urlObj.searchParams.set('token', newToken);

              dispatch({ type: wsActions.wsConnect, payload: urlObj.toString() });
            } catch (error) {
              console.error('Не получилось обновить токен:', error);
              dispatch({ type: wsActions.wsError, payload: 'Не получилось обновить токен' });
            }
          } else {
            dispatch({
              type: wsActions.wsMessage,
              payload: parsedData,
            });
          }
        }

        socket.onclose = (event) => {
          if (closing) {
            dispatch({ type: wsActions.wsClose, payload: event });
          } else {
            dispatch({ type: wsActions.wsClose, payload: url });
          }
        };
      }

      if (type === wsActions.wsDisconnect && socket) {
        closing = true;
        socket.close();
      }

      next(action);
    }
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
