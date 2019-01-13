// To create a new request
import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign'; // to get the ABI for the Contract
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import { EventEmitter } from 'events';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: ''
    };

    //we need the address of the Contract
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    // Anonymous funciton is used here because we want to preserve 'this' variable
    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest( description, web3.utils.toWei(value, 'ether'), recipient)
                .send({ from: accounts[0] });
        } catch (err) {

        }
    };

    render() {
        return (
            <Layout>
                <h3>Create a Request </h3>
                {/* no parentheses after onSubmit because we are passing it an anonymous function that will be executed later 
                 error property is used her to toggle Message Component on/off
                 !! it converts opp boolean twice*/}
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={ event => this.setState({ description: event.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={ event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>

                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;