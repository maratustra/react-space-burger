import { RootState } from '../store';

export const getFeedMessages = (state: RootState) => state.orderFeed.messages || [];
export const getFeedWsConnected = (state: RootState) => state.orderFeed.wsConnected;
export const getFeedWsError = (state: RootState) => state.orderFeed.error;
