import { combineReducers } from "redux";

import planning from "./planningReducer";
import error from "./errorReducer";

export default combineReducers({
  planning,
  error
});
