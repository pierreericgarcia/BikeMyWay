import "./styles.css";

import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import ArrivalIcon from "./arrival.svg";
import DepartureIcon from "./departure.svg";
import CurrentLocationIcon from "./current_location.svg";
import classnames from "classnames";

export class LocationSearchInput extends Component {
  onChange = address => {
    const { onChange } = this.props;
    onChange({ address, geocode: null });
  };

  onSelect = address => {
    const { onChange } = this.props;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => onChange({ address, geocode: latLng }));
  };

  getCurrentLocation = () => {
    const { onChange } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        onChange({
          address: "Current position",
          geocode: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  render() {
    const { value, planningStep = "departure" } = this.props;

    return (
      <div className="locationSearchInput">
        <div className="locationSearchInputIcon">
          {planningStep === "departure" ? (
            <img width="15" src={DepartureIcon} />
          ) : (
            <img width="15" src={ArrivalIcon} />
          )}
        </div>
        <div className="locationSearchInputField">
          <PlacesAutocomplete
            value={value}
            onChange={this.onChange}
            onSelect={this.onSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div className="locationSearchInputFieldDropdownContainer">
                <input
                  {...getInputProps({
                    placeholder: `Choose your ${planningStep}`
                  })}
                />
                {suggestions.length > 0 ? (
                  <div className="locationSearchInputFieldDropdown">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className: classnames(
                              "locationSearchInputFieldDropdownSuggestion",
                              {
                                active: suggestion.active
                              }
                            )
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        {planningStep === "departure" ? (
          <button
            onClick={this.getCurrentLocation}
            className="locationSearchInputCurrentPosition"
          >
            <img width="15" src={CurrentLocationIcon} />
          </button>
        ) : null}
      </div>
    );
  }
}
