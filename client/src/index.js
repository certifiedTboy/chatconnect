import React from "react";
import store from "./store/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {" "}
      <div>
        <App />{" "}
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
