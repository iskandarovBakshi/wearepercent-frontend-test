import React, { lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WelcomePage from "./pages/WelcomePage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" exact render={() => <HomePage />}></Route>
      <Route path="/welcome" exact render={() => <WelcomePage />}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
