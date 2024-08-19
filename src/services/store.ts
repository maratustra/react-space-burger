import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from "redux";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { TApplicationActions } from "./types/index";
import ingredientsReducer from "./reducers/ingredients";
import modalReducer from "./reducers/modal";
import orderReducer from "./reducers/order";
import tabReducer from "./reducers/tabs";
import constructorReducer from "./reducers/constructor";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  user: authReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  tabs: tabReducer,
  constructorReducer: constructorReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

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