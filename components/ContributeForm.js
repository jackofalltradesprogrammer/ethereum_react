// this component will be used in multiple places so that users can contribute to the contract
import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign'; // to get the contract instance from the arrow function by passing the address
import web3 from '../ethereum/web3'; // to get the accounts to submit the transaction

class ContributeForm extends Component {
    state = {
        value: ''
    };

    // Anonymous funciton is used here because we want to preserve 'this' variable
    onSubmit = (event) => {
        event.preventDefault();
        
        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
        } catch (err) {

        }
    };

    // for the form Sumbission, an arrow function is passed to preserve 'this' value
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label> Amount ot Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value })} 
                        label="ether" 
                        labelPosition="right"
                    />
                </Form.Field>
                <Button primary>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;