import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  Reducer
} from "redux";
import { thunk, ThunkAction, ThunkDispatch, ThunkMiddleware } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { TApplicationActions } from "./types/index";
import ingredientsReducer, { TIngredientsState } from "./reducers/ingredients";
import modalReducer, { TModalState } from "./reducers/modal";
import orderReducer, { TOrderState } from "./reducers/order";
import tabReducer, { TTabState } from "./reducers/tabs";
import constructorReducer, { TConstructorState } from "./reducers/constructor";
import authReducer, { TAuthState } from "./reducers/auth";

// const rootReducer = combineReducers<{
//   user: TAuthState;
//   ingredients: TIngredientsState;
//   modal: TModalState;
//   order: TOrderState;
//   tabs: TTabState;
//   constructorReducer: TConstructorState;
// }>({
//   user: authReducer,
//   ingredients: ingredientsReducer,
//   modal: modalReducer,
//   order: orderReducer,
//   tabs: tabReducer,
//   constructorReducer: constructorReducer,
// });


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