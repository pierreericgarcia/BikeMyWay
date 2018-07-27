import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Home } from "./routes";
import { Planning } from "./routes/planning";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/planning/:departure/:arrival"
            component={Planning}
          />
          <Route render={() => <h3>404</h3>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
