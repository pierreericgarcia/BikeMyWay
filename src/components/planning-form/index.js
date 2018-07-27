import "./styles.css";

import React, { Component } from "react";
import { LocationSearchInput } from "../location-search-input";

export class PlanningForm extends Component {
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

  render() {
    const { departure, arrival } = this.state;

    return (
      <div className="planningForm">
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
          disabled={!this.locationsAreValid()}
        >
          Let's ride 🚲
        </button>
      </div>
    );
  }
}
