import "./styles.css";

import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="Layout">
        <nav className="navBar">
          <Link className="navBarLink" to="/">
            BikeMyWay
          </Link>
        </nav>
        <div className="LayoutContainer">{children}</div>
      </div>
    );
  }
}
