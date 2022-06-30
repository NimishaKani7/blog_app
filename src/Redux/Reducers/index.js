import Reducer from "./Reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  blog: Reducer
});

export default allReducers;
