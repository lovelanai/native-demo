import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ServiceProvider from "./Context/service.context";
import "./index.css";

import reportWebVitals from "./reportWebVitals";


i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ServiceProvider>
          <I18nextProvider i18n={i18next}>
        <App />
          </I18nextProvider>
      </ServiceProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
