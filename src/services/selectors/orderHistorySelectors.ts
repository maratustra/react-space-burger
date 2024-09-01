import { RootState } from '../store';

export const getHistoryMessages = (state: RootState) => state.orderHistory.messages || [];
export const getHistoryWsConnected = (state: RootState) => state.orderHistory.wsConnected;
export const getHistoryWsError = (state: RootState) => state.orderHistory.error;
