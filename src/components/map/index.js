/* eslint-disable no-undef */

import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import axios from "axios";

export const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ6VfBwTpWSgS0sDUp40JL_rV8LLx5Rkw&libraries=geometry,direction",
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

      axios
        .get(
          "https://api.jcdecaux.com/vls/v1/stations?apiKey=d9358ba9d227951e83d301303262a22c47c05a26"
        )
        .then(response => {
          const departureLocationStructured = new google.maps.LatLng({
            lat: departure.lat,
            lng: departure.lng
          });
          const arrivalLocationStructured = new google.maps.LatLng({
            lat: arrival.lat,
            lng: arrival.lng
          });

          const stationsStructured = response.data.map(station => ({
            ...station,
            position: new google.maps.LatLng({
              lat: station.position.lat,
              lng: station.position.lng
            })
          }));

          const nearestDepartureStation = stationsStructured
            .map(station => ({
              ...station,
              distance: google.maps.geometry.spherical.computeDistanceBetween(
                station.position,
                departureLocationStructured
              )
            }))
            .filter(station => station.available_bikes > 0)
            .sort(
              (station, nextStation) => station.distance - nextStation.distance
            )[0];

          const nearestArrivalStation = stationsStructured
            .map(station => ({
              ...station,
              distance: google.maps.geometry.spherical.computeDistanceBetween(
                station.position,
                arrivalLocationStructured
              )
            }))
            .filter(station => station.available_bike_stands > 0)
            .sort(
              (station, nextStation) => station.distance - nextStation.distance
            )[0];

          this.setState({
            nearestDepartureStation,
            nearestArrivalStation,
            stations: response.data
          });

          const DirectionsService = new google.maps.DirectionsService();

          DirectionsService.route(
            {
              origin: departureLocationStructured,
              destination: nearestDepartureStation.position,
              travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  departureWalkingDirections: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );

          DirectionsService.route(
            {
              origin: nearestDepartureStation.position,
              destination: nearestArrivalStation.position,
              travelMode: google.maps.TravelMode.BICYCLING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  bicyclingDirections: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );

          DirectionsService.route(
            {
              origin: nearestArrivalStation.position,
              destination: arrivalLocationStructured,
              travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  arrivalWalkingDirections: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        });
    }
  })
)(props => (
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.866667, lng: 2.333333 }}>
    <DirectionsRenderer
      defaultOptions={{
        suppressBicyclingLayer: true,
        polylineOptions: {
          strokeColor: "green",
          strokeOpacity: 0.5
        }
      }}
      directions={props.departureWalkingDirections}
    />
    <DirectionsRenderer
      defaultOptions={{
        suppressBicyclingLayer: true,
        polylineOptions: {
          strokeColor: "blue",
          strokeOpacity: 0.5
        }
      }}
      directions={props.bicyclingDirections}
    />
    <DirectionsRenderer
      defaultOptions={{
        suppressBicyclingLayer: true,
        polylineOptions: {
          strokeColor: "green",
          strokeOpacity: 0.5
        }
      }}
      directions={props.arrivalWalkingDirections}
    />
  </GoogleMap>
));
