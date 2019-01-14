import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
    onApprove = async () => {
        const campaign = Campaign(this.props.address); // as the parent component is passing the address

        const accounts = await web3.eth.getAccounts();
        // A user can send the approval for a request
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    render() {
        const { Row, Cell } = Table; //ES15 syntax to store Table.Row in Row etc
        const { id, request, approversCount } = this.props;
        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {/* We don't use parentheses () after this.onApprove becuase we don't want to call it right away */}
                    <Button color="green" basic onClick={this.onApprove}>
                        Approve
                    </Button>
                </Cell>
                <Cell>
                    {/* We don't use parentheses () after this.onApprove becuase we don't want to call it right away */}
                    <Button color="teal" basic onClick={this.onFinalize}>
                        Finalize
                    </Button>
                </Cell>                
            </Row>
        );
    }
}

export default RequestRow;