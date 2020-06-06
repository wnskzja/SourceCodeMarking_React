import React from "react";
import { Route, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";

const AuthRouter = ({ component: Component, role, pageTitle, ...rest }) => {
  if (pageTitle) {
    window.document.title = pageTitle;
  }
  const protectRoute = (props) => {
    const roleLocal = JSON.parse(localStorage.getItem("user")).role;
    if (role === roleLocal) {
      return <Component {...props} />;
    } else {
      return <NotFound />;
    }
  };
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("token") ? (
            <>{protectRoute(props)}</>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    </>
  );
};

export default AuthRouter;
