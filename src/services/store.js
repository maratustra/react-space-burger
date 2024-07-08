import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import ingredientsReducer from "./reducers/ingredients";
import modalReducer from "./reducers/modal";
import orderReducer from "./reducers/order";
import tabReducer from "./reducers/tabs";
import constructorReducer from "./reducers/constructor";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  tabs: tabReducer,
  constructorReducer: constructorReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
