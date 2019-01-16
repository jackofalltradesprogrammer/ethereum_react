import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"; // we need factory to access the ABI to interact with our contract
import web3 from "../../ethereum/web3";
import { Router } from "../../routes"; // Link (not using here) helps us generate anchror tages for navigation, Router to redirect people from one page to another

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };

  // Anonymous funciton is used here because we want to preserve 'this' variable
  onSubmit = async event => {
    event.preventDefault();

    // for the loading spinner to appear in UI as react renders the form
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Deploy a Contract</h3>

        {/* no parentheses after onSubmit because we are passing it an anonymous function that will be executed later 
            error property is used her to toggle Message Component on/off
            !! it converts opp boolean twice*/}
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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

          {/* Message Component from Semantic UI to display errors. THIS WON'T WORK UNLESS YOU ADD ERROR PROPERTY TO FORM */}
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
