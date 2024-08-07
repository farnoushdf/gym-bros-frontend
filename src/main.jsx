import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextWrapper } from "./context/auth.context";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthContextWrapper>
      <App />
    </AuthContextWrapper>
  </Router>
);
