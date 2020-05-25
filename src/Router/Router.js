import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <AuthRouter exact path="/home" component={Home} />
        <AuthRouter exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
