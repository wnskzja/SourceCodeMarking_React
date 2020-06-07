import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  title: "",
  notifications: [],
};

export const GlobalContext = createContext(initialState);
const ReactContext = ({ children, notifications }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  state.listNotification = notifications;
  const setListNoti = (listNoti) => {
    dispatch({
      type: "SET_LIST_NOTI",
      payload: listNoti,
    });
  };

  const setIsReadNoti = (idNoti) => {
    dispatch({
      type: "SET_IS_READ_NOTI",
      payload: idNoti,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        title: state.title,
        listNotification: state.notifications,
        setListNoti,
        setIsReadNoti,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default ReactContext;
