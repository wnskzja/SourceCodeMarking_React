import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  title: "",
  notifications: [],
};

export const GlobalContext = createContext(initialState);
const ReactContext = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const setListNoti = (listNoti) => {
    dispatch({
      type: "SET_LIST_NOTI",
      payload: listNoti,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        title: state.title,
        listNotification: state.notifications,
        setListNoti,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default ReactContext;
