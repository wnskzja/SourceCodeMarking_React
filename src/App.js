import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
