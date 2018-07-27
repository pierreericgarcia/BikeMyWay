import { SUCCESS_PLANNING } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SUCCESS_PLANNING:
      return action.payload;
    default:
      return state;
  }
};
