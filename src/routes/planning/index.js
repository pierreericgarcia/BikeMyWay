import React, { Component } from "react";
import { Layout } from "../../components/layout";
import { PlanningCard } from "../../components/planning-card";

export class Planning extends Component {
  render() {
    return (
      <Layout>
        <h1>Here's your ride</h1>
        <PlanningCard />
      </Layout>
    );
  }
}
