import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  title: "Danh sách Lớp",
};

export const GlobalContext = createContext(initialState);
const ReactContext = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function setTitle(title) {
    dispatch({
      type: "SET_TITLE",
      payload: title,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        title: state.title,
        setTitle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default ReactContext;
