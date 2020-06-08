import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AuthRouter from "./AuthRouter";
import ReactContext from "../ReactContext/ReactContext";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import TeacherAdmin from "../components/Admin/TeacherAdmin/TeacherAdmin";
import StudentAdmin from "../components/Admin/StudentAdmin/StudentAdmin";
import AddUser from "../components/Admin/AddUser/AddUser";
import ClassesAdmin from "../components/Admin/ClassesAdmin/ClassesAdmin";
import ExerciseAdmin from "../components/Admin/ExerciseAdmin/ExerciseAdmin";
import HomeTeacher from "../components/HomeTeacher/HomeTeacher";
import HomeStudent from "../components/HomeStudent/HomeStudent";
import ListClassStudent from "../components/ListClassStudent/ListClassStudent";
import DetailClass from "../components/DetailClass/DetailClass";
import StudentExercise from "../components/StudentExercise/StudentExercise";
import TeacherExercise from "../components/TeacherExercise/TeacherExercise";
import Mark from "../components/Mark/Mark";
import ProfileUser from "../components/ProfileUser/ProfileUser";
import VerifyEmail from "../components/VerifyEmail/VerifyEmail";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import ConfirmPass from "../components/ConfirmPass/ConfirmPass";
import NotFound from "../components/NotFound/NotFound";
import Notifications from "../components/Notifications/Notifications";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import NotFoundServer from "../components/NotFoundServer/NotFoundServer";

const hist = createBrowserHistory();
const NavRouter = () => {
  return (
    <ReactContext>
      <Router history={hist}>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/confirmation/:token" component={VerifyEmail} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route exact path="/password/:token" component={ConfirmPass} />
          <Route exact path="/errorserver" component={NotFoundServer} />

          <AuthRouter exact path="/admin" component={Dashboard} role="ADMIN" />
          <AuthRouter
            exact
            path="/admin/teacher"
            component={TeacherAdmin}
            role="ADMIN"
          />
          <AuthRouter
            exact
            path="/admin/student"
            component={StudentAdmin}
            role="ADMIN"
          />
          <AuthRouter
            exact
            path="/admin/adduser"
            component={AddUser}
            role="ADMIN"
          />
          <AuthRouter
            exact
            path="/admin/classes"
            component={ClassesAdmin}
            role="ADMIN"
          />
          <AuthRouter
            exact
            path="/admin/exercise"
            component={ExerciseAdmin}
            role="ADMIN"
          />

          <AuthRouter
            exact
            path="/teacher"
            component={HomeTeacher}
            role="TEACHER"
          />
          <AuthRouter
            exact
            path="/teacher/profile"
            component={ProfileUser}
            role="TEACHER"
          />
          <AuthRouter
            exact
            path="/teacher/class/:id"
            component={DetailClass}
            role="TEACHER"
          />
          <AuthRouter
            exact
            role="TEACHER"
            path="/teacher/exercise/:id"
            component={TeacherExercise}
          />
          <AuthRouter
            exact
            role="TEACHER"
            path="/teacher/mark/exercise/:id"
            component={Mark}
          />
          <AuthRouter
            exact
            role="TEACHER"
            path="/teacher/changepassword"
            component={ChangePassword}
          />

          <AuthRouter
            exact
            path="/student"
            component={HomeStudent}
            role="STUDENT"
          />
          <AuthRouter
            exact
            path="/student/profile"
            component={ProfileUser}
            role="STUDENT"
          />
          <AuthRouter
            role="STUDENT"
            exact
            path="/student/listclass"
            component={ListClassStudent}
          />
          <AuthRouter
            exact
            path="/student/class/:id"
            role="STUDENT"
            component={DetailClass}
          />
          <AuthRouter
            role="STUDENT"
            exact
            path="/student/exercise/:id"
            component={StudentExercise}
          />
          <AuthRouter
            role="STUDENT"
            exact
            path="/student/notifications"
            component={Notifications}
          />
          <AuthRouter
            role="STUDENT"
            exact
            path="/student/changepassword"
            component={ChangePassword}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ReactContext>
  );
};

export default NavRouter;
