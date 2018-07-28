/* eslint-disable no-undef */

import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

export const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ6VfBwTpWSgS0sDUp40JL_rV8LLx5Rkw",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `60vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const {
        planning: { departure, arrival }
      } = this.props;
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(departure.lat, departure.lng),
          destination: new google.maps.LatLng(arrival.lat, arrival.lng),
          travelMode: google.maps.TravelMode.BICYCLING
        },
        (result, status) => {
          console.log(result);
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.866667, lng: 2.333333 }}>
    {props.children}
    <DirectionsRenderer directions={props.directions} />
  </GoogleMap>
));
