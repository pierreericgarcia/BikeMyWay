import { ERROR_PLANNING } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case ERROR_PLANNING:
      return action.payload;
    default:
      return state;
  }
};
