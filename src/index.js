import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Button from "./components/Button.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Button />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
