import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./main.css";

import AppRoutes from "./Routes/AppRoutes";
import store from "./Redux/store";

document.documentElement.lang = "fa";
document.documentElement.dir = "rtl";

const isAdminRoute =
  window.location.hash.startsWith("#/login") ||
  window.location.hash.startsWith("#/dashboard");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {isAdminRoute ? (
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      ) : (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      )}
    </Provider>
  </StrictMode>,
);
export default AppRoutes;
