import "./styles.css";

import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

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
          {planningStep === "departure" ? "departure" : "arrival"}
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
              <div>
                <input
                  {...getInputProps({
                    placeholder: `Choose your ${planningStep}`,
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        {planningStep === "departure" ? (
          <button
            onClick={this.getCurrentLocation}
            className="locationSearchInputCurrentPosition"
          >
            >
          </button>
        ) : null}
      </div>
    );
  }
}
