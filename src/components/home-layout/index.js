import React, { Component } from "react";
import { Link } from "react-router-dom";

export class HomeLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <nav>
          <Link to="/">BikeMyWay</Link>
        </nav>
        {children}
      </div>
    );
  }
}
