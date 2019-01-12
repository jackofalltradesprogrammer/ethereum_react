import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory"; //gets the instance to interact with the contract - web3 takes care of authentication
import Layout from '../components/Layout';

// class based component
class CampaignIndex extends Component {
  static async getInitialProps() {
    // static is a class function and not instance. THis function is exclusive to NEST and is run without rendering the component
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns }; // this is provided as props to our component and is read as {campaigns : campaigns}
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      // we pass a function to map, that function is called once for every elementin the array
      return {
        header: address, //first thing to display on the card for Semantic UI
        description: <a>View campaigns</a>,
        fluid: true // it is used to stretch the card to cover the window screen available
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button floated="right"
          content = "Create Campaign"
          icon="add circle"
          primary // its read as primary = {true} in react
          />
        {this.renderCampaigns()}
      </div>
      </Layout>
    );
  }
}

// NEXT expect an export of react component

export default CampaignIndex;
