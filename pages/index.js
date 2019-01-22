import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory"; //gets the instance to interact with the contract - web3 takes care of authentication
import Layout from "../components/Layout";
import { Link } from "../routes";

// class based component
class ContractIndex extends Component {
  static async getInitialProps() {
    // static is a class function and not instance. THis function is exclusive to NEST and is run without rendering the component
    const contracts = await factory.methods.getDeployedContracts().call();

    return { contracts }; // this is provided as props to our component and is read as {contracts : contracts}
  }

  renderContracts() {
    const items = this.props.contracts.map(address => {
      // we pass a function to map, that function is called once for every elementin the array
      return {
        header: address, //first thing to display on the card for Semantic UI
        description: (
          <Link route={`/contracts/${address}`}>
            <a>View Contracts</a>
          </Link>
        ),
        fluid: true // it is used to stretch the card to cover the window screen available
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Contracts</h3>
          {/* a generic component that doesn't add anything of its own. It wraps its children with clickEvent handler to navigate
                <a> tags are used to get Semantic UI to display some css */}
          <Link route="/contracts/new">
            <a>
              <Button
                floated="right"
                content="Deploy Contract"
                icon="add circle"
                primary // its read as primary = {true} in react
              />
            </a>
          </Link>
          {this.renderContracts()}
        </div>
      </Layout>
    );
  }
}

// NEXT expect an export of react component

export default ContractIndex;
