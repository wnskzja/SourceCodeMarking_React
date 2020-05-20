import { combineReducers } from "redux";
import userReducers from "./userReducers";
import initialState from "../initialState";

export default combineReducers({
  user: userReducers(initialState.user),
});
