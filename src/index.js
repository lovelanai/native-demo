import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ServiceProvider from "./Context/service.context";
import "./locales/i18next";

import reportWebVitals from "./reportWebVitals";



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
