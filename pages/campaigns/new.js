import React, { Component } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"; // we need factory to access the ABI to interact with our contract
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: ""
  };

  // Anonymous funciton is used here because we want to preserve 'this' variable 
  onSubmit= async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
            from: accounts[0]
        });

  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        {/* no parentheses after onSubmit because we are passing it an anonymous function that will be executed later */}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
