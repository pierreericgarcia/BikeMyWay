import "./styles.css";

import React, { Component } from "react";
import { Map } from "../map";
import { withRouter } from "react-router-dom";
import { Marker } from "react-google-maps";
import idx from "idx";

class DumbPlanningCard extends Component {
  render() {
    const {
      match: {
        params: { arrivalGeocode, departureGeocode }
      }
    } = this.props;

    const departureGeocodeSplitted = departureGeocode.split("_");
    const departureLat = idx(departureGeocodeSplitted, _ => _[0]);
    const departureLng = idx(departureGeocodeSplitted, _ => _[1]);

    const arrivalGeocodeSplitted = arrivalGeocode.split("_");
    const arrivalLat = idx(arrivalGeocodeSplitted, _ => _[0]);
    const arrivalLng = idx(arrivalGeocodeSplitted, _ => _[1]);

    return (
      <div className="planningCard card">
        <Map
          planning={{
            departure: { lat: departureLat, lng: departureLng },
            arrival: { lat: arrivalLat, lng: arrivalLng }
          }}
        >
          {departureLat && departureLng ? (
            <Marker
              position={{
                lat: parseFloat(departureLat),
                lng: parseFloat(departureLng)
              }}
            />
          ) : null}
          {arrivalLat && arrivalLng ? (
            <Marker
              position={{
                lat: parseFloat(arrivalLat),
                lng: parseFloat(arrivalLng)
              }}
            />
          ) : null}
        </Map>
      </div>
    );
  }
}

export const PlanningCard = withRouter(DumbPlanningCard);
