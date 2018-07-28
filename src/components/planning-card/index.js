import "./styles.css";

import React, { Component } from "react";
import { Map } from "../map";
import { withRouter } from "react-router-dom";
import idx from "idx";

class DumbPlanningCard extends Component {
  render() {
    const {
      match: {
        params: { arrivalGeocode, departureGeocode }
      }
    } = this.props;

    const departureGeocodeSplitted = departureGeocode.split("_");
    const departureLat = parseFloat(idx(departureGeocodeSplitted, _ => _[0]));
    const departureLng = parseFloat(idx(departureGeocodeSplitted, _ => _[1]));

    const arrivalGeocodeSplitted = arrivalGeocode.split("_");
    const arrivalLat = parseFloat(idx(arrivalGeocodeSplitted, _ => _[0]));
    const arrivalLng = parseFloat(idx(arrivalGeocodeSplitted, _ => _[1]));

    return (
      <div className="planningCard card">
        <Map
          planning={{
            departure: { lat: departureLat, lng: departureLng },
            arrival: { lat: arrivalLat, lng: arrivalLng }
          }}
        />
      </div>
    );
  }
}

export const PlanningCard = withRouter(DumbPlanningCard);
