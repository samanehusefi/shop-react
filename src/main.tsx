import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./main.css";

import AppRoutes from "./Routes/AppRoutes";
import store from "./Redux/store";

document.documentElement.lang = "fa";
document.documentElement.dir = "rtl";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </Provider>
  </StrictMode>,
);
