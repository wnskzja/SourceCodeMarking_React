import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AuthRouter from "./AuthRouter";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/Home/Home";
import HomeTeacher from "../components/HomeTeacher/HomeTeacher";
import HomeStudent from "../components/HomeStudent/HomeStudent";
import ReactContext from "../ReactContext/ReactContext";

const hist = createBrowserHistory();
const NavRouter = () => {
  return (
    <ReactContext>
      <Router history={hist}>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <AuthRouter exact path="/home" component={Home} />
          <AuthRouter path="/teacher" component={HomeTeacher} />
          <AuthRouter path="/student" component={HomeStudent} />
        </Switch>
      </Router>
    </ReactContext>
  );
};

export default NavRouter;
