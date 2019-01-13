// this component will be used in multiple places so that users can contribute to the contract
import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';

class ContributeForm extends Component {
    render() {
        return (
            <Form>
                <Form.Field>
                    <label> Amount ot Contribute</label>
                    <Input 
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