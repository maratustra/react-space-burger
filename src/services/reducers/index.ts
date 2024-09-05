import { combineReducers } from 'redux';
import authReducer from './auth';
import constructorReducer from './constructor';
import ingredientsReducer from './ingredients';
import modalReducer from './modal';
import orderReducer from './order';
import tabReducer from './tabs';
import { orderFeedWsReducer, orderHistoryWsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  user: authReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  tabs: tabReducer,
  constructor: constructorReducer,
  orderFeed: orderFeedWsReducer,
  orderHistory: orderHistoryWsReducer,
});

export default rootReducer;