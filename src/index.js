import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Router from "./Router/Router";

render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
