import { SUCCESS_PLANNING, ERROR_PLANNING } from "./types";

const successPlanning = planningData => ({
  type: SUCCESS_PLANNING,
  payload: planningData
});

const errorPlanning = message => ({
  type: ERROR_PLANNING,
  payload: message
});

export function fetchPlanning(departure, arrival) {
  return dispatch => {
    if (false) {
      dispatch(successPlanning(null));
    } else {
      dispatch(errorPlanning("error"));
    }
  };
}
