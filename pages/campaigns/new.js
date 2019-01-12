import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"; // we need factory to access the ABI to interact with our contract
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: ''
  };

  // Anonymous funciton is used here because we want to preserve 'this' variable
  onSubmit = async event => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
    } catch (err) {
        this.setState({errorMessage: err.message});
    }
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

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
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
