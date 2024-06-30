import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import "./index.css";
import App from "./components/app/app";
import rootReducer from "./services/reducers";

// Настройка расширения Redux DevTools
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
