import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AuthRouter from "./AuthRouter";
import ReactContext from "../ReactContext/ReactContext";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Home from "../components/Home/Home";
import HomeTeacher from "../components/HomeTeacher/HomeTeacher";
import HomeStudent from "../components/HomeStudent/HomeStudent";
import ListClassStudent from "../components/ListClassStudent/ListClassStudent";
import DetailClass from "../components/DetailClass/DetailClass";
import StudentExercise from "../components/StudentExercise/StudentExercise";
import TeacherExercise from "../components/TeacherExercise/TeacherExercise";
import Mark from "../components/Mark/Mark";
import ProfileUser from "../components/ProfileUser/ProfileUser";

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
          <AuthRouter exact path="/profile" component={ProfileUser} />
          <AuthRouter exact path="/teacher" component={HomeTeacher} />
          <AuthRouter exact path="/teacher/class/:id" component={DetailClass} />
          <AuthRouter
            exact
            path="/teacher/exercise/:id"
            component={TeacherExercise}
          />
          <AuthRouter exact path="/mark/exercise/:id" component={Mark} />

          <AuthRouter exact path="/student" component={HomeStudent} />
          <AuthRouter
            exact
            path="/student/listclass"
            component={ListClassStudent}
          />
          <AuthRouter exact path="/student/class/:id" component={DetailClass} />
          <AuthRouter
            exact
            path="/student/exercise/:id"
            component={StudentExercise}
          />
        </Switch>
      </Router>
    </ReactContext>
  );
};

export default NavRouter;
