import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from "redux";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { TApplicationActions } from "./types/index";
import ingredientsReducer from "./reducers/ingredients";
import authReducer from "./reducers/auth";
import modalReducer from "./reducers/modal";
import orderReducer from "./reducers/order";
import tabReducer from "./reducers/tabs";
import constructorReducer from "./reducers/constructor";
import { orderFeedWsReducer, orderHistoryWsReducer } from "./reducers/wsReducer";
import { feedSocketMiddleware, historySocketMiddleware } from "./middleware/socketMiddleware";

export const rootReducer = combineReducers({
  user: authReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  tabs: tabReducer,
  constructorReducer: constructorReducer,
  orderFeed: orderFeedWsReducer,
  orderHistory: orderHistoryWsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, feedSocketMiddleware, historySocketMiddleware))
);

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;