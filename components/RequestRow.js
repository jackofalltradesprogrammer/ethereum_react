import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Contract from '../ethereum/contract';
import {Router} from '../routes';

class RequestRow extends Component {
    onApprove = async () => {
        const contract = Contract(this.props.address); // as the parent component is passing the address

        const accounts = await web3.eth.getAccounts();
        // A user can send the approval for a request
        await contract.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
        Router.pushRoute(`/contracts/${this.props.address}/requests`);
    };

    onFinalize = async () => {
        const contract = Contract(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await contract.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
        Router.pushRoute(`/contracts/${this.props.address}/requests`);
    };

    render() {
        const { Row, Cell } = Table; //ES15 syntax to store Table.Row in Row etc
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {/* We don't use parentheses () after this.onApprove becuase we don't want to call it right away */}
                    { request.complete ? null : (
                    <Button color="green" basic onClick={this.onApprove}>
                        Approve
                    </Button>
                    )}
                </Cell>
                <Cell>
                    {/* We don't use parentheses () after this.onApprove becuase we don't want to call it right away */}
                    { request.complete ? null : (
                    <Button color="teal" basic onClick={this.onFinalize}>
                        Finalize
                    </Button>
                    )}
                </Cell>                
            </Row>
        );
    }
}

export default RequestRow;