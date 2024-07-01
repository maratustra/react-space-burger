import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import ingredientsReducer from "./reducers/ingredients";
import modalReducer from "./reducers/modal";
import orderReducer from "./reducers/order";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
