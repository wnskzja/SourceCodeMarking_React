import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRouter = ({ component: Component, role, pageTitle, ...rest }) => {
  if (pageTitle) {
    window.document.title = pageTitle;
  }
  const protectRoute = (props) => {
    const roleLocal = JSON.parse(localStorage.getItem("user")).role;
    if (role === roleLocal) {
      return <Component {...props} />;
    } else {
      return <div>éo có quyên ok ?</div>;
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
