import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { GlobalContext } from "../ReactContext/ReactContext";

const AuthRouter = ({ component: Component, role, pageTitle, ...rest }) => {
  if (pageTitle) {
    window.document.title = pageTitle;
  }
  const client = new W3CWebSocket(
    "wss://staging-source-code-marking.herokuapp.com/api/v1/ws"
  );
  const { setListNoti } = useContext(GlobalContext);

  useEffect(() => {
    if (role === "STUDENT") {
      const token = localStorage.getItem("token");
      client.onopen = () => {
        try {
          client.send(JSON.stringify({ jwt: token }));
        } catch (error) {}
      };
      client.onmessage = (message) => {
        setListNoti(JSON.parse(JSON.parse(message.data).notifications));
      };
    }
  }, [setListNoti]);
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
