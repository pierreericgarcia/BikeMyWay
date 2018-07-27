import "./styles.css";

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { LocationSearchInput } from "../location-search-input";

class DumbPlanningForm extends Component {
  state = {
    departure: "",
    arrival: ""
  };

  locationsAreValid = () => {
    const { departure, arrival } = this.state;

    if (departure.length > 0 && arrival.length > 0) {
      return true;
    }

    return false;
  };

  startPlanning = () => {
    const { departure, arrival } = this.state;
    if (this.locationsAreValid()) {
      this.props.history.push(`/planning/${departure}/${arrival}`);
    }
  };

  render() {
    const { departure, arrival } = this.state;

    return (
      <div className="planningForm">
        <h4 className="planningFormTitle">Plan your trip</h4>
        <LocationSearchInput
          value={departure}
          onChange={value => this.setState({ departure: value })}
        />
        <LocationSearchInput
          value={arrival}
          onChange={value => this.setState({ arrival: value })}
          planningStep="arrival"
        />
        <button
          className="planningFormButton"
          onClick={this.startPlanning}
          disabled={!this.locationsAreValid()}
        >
          Let's ride 🚲
        </button>
      </div>
    );
  }
}

export const PlanningForm = withRouter(DumbPlanningForm);
