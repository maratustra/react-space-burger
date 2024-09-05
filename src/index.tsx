import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/app/app";
import { store } from "./services/store";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
