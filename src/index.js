import React from "react";
import ReactDOM from "react-dom/client";
// import { compose } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/app/app";
import { store } from "./services/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
