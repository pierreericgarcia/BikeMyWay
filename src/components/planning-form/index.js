import "./styles.css";

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { LocationSearchInput } from "../location-search-input";

class DumbPlanningForm extends Component {
  state = {
    departure: {
      address: "",
      geocode: null
    },
    arrival: {
      address: "",
      geocode: null
    }
  };

  locationsAreValid = () => {
    const { departure, arrival } = this.state;

    if (departure.geocode && arrival.geocode) {
      return true;
    }

    return false;
  };

  startPlanning = () => {
    const { departure, arrival } = this.state;
    if (this.locationsAreValid()) {
      const stringifiedDeparture = `${departure.geocode.lat}_${
        departure.geocode.lng
      }`;
      const stringifiedArrival = `${arrival.geocode.lat}_${
        arrival.geocode.lng
      }`;
      this.props.history.push(
        `/planning/${stringifiedDeparture}/${stringifiedArrival}`
      );
    }
  };

  render() {
    const { departure, arrival } = this.state;

    return (
      <div className="planningForm">
        <h4 className="planningFormTitle">Plan your trip</h4>
        <LocationSearchInput
          value={departure.address}
          onChange={value => this.setState({ departure: value })}
        />
        <LocationSearchInput
          value={arrival.address}
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
