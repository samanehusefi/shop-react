import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./main.css";

import HashRouter from "./Routes/AppRoutes";
import store from "./Redux/store";

document.documentElement.lang = "fa";
document.documentElement.dir = "rtl";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter />
    </Provider>
  </StrictMode>,
);
