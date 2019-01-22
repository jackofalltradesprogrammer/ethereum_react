// this component will be used in multiple places so that users can contribute to the contract
import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Contract from '../ethereum/contract'; // to get the contract instance from the arrow function by passing the address
import web3 from '../ethereum/web3'; // to get the accounts to submit the transaction
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',   // to display error message of any kind
        loading: false      // to toggle spinner on/off
    };

    // Anonymous funciton is used here because we want to preserve 'this' variable
    onSubmit = async (event) => {
        event.preventDefault();
        
        const contract = Contract(this.props.address);

        // starts the spinner and makes the message disappear
        this.setState({loading: true, errorMessage: ''});

        try {
            // we are contributing some money to the contract
            const accounts = await web3.eth.getAccounts();
            await contract.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            // This causes the refresh of the page after the transaction completes successfully
            Router.replaceRoute(`/contracts/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        // resets the Contribution form
        this.setState({ loading: false, value: ''});
    };

    // for the form Sumbission, an arrow function is passed to preserve 'this' value
    // error property in the form tells Semantic UI to display message if error is present
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label> Amount ot Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value })} 
                        label="ether" 
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;