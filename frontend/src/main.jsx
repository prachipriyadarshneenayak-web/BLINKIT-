import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./redux/store";

import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      theme="light"
    />
  </Provider>
</BrowserRouter>
);