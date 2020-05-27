import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AuthRouter from "./AuthRouter";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
import HomeTeacher from "../components/HomeTeacher/HomeTeacher";
import HomeStudent from "../components/HomeStudent/HomeStudent";

const hist = createBrowserHistory();
const NavRouter = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <AuthRouter exact path="/home" component={Home} />
        <AuthRouter exact path="/profile" component={Profile} />
        <AuthRouter path="/teacher" component={HomeTeacher} />
        <AuthRouter path="/student" component={HomeStudent} />
      </Switch>
    </Router>
  );
};

export default NavRouter;
