import React, { Component, Fragment } from "react";
import { Layout } from "../components/layout";
import { PlanningForm } from "../components/planning-form";

export class Home extends Component {
  render() {
    return (
      <Layout>
        <h1>Riding has never been easier.</h1>
        <PlanningForm />
      </Layout>
    );
  }
}
