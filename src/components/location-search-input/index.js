import "./styles.css";

import React, { Component } from "react";

export class LocationSearchInput extends Component {
  onChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { value, planningStep = "departure" } = this.props;

    return (
      <div className="locationSearchInput">
        <div className="locationSearchInputIcon">
          {planningStep === "departure" ? "departure" : "arrival"}
        </div>
        <div className="locationSearchInputField">
          <input
            value={value}
            onChange={this.onChange}
            placeholder={`Choose your ${planningStep}`}
          />
        </div>
        {planningStep === "departure" ? (
          <div className="locationSearchInputCurrentPosition">></div>
        ) : null}
      </div>
    );
  }
}
