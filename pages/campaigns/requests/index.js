//to show List of Requests on this component
import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow'; // This child component will render each request 

class RequestIndex extends Component {
    // this function provided by NEXT can be used to pull info from the address bar
    static async getInitialProps(props) {
        const { address} = props.query; // address variable is like a wildcard defined in the route.js
        const campaign = Campaign(address); // pass teh address to the arrow function to Campaign and get the instance
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        // Array(count).fill.map() runs number of times starting from 0 and more and gets the elements
        const requests = await Promise.all(
          Array(parseInt(requestCount)).fill().map((element, index) => {
              return campaign.methods.requests(index).call()
          })  
        );


        return { address, requests, requestCount, approversCount }; // its read as address: address

    }
    
    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index} // react needs a key property if we are rendering list of components
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />;
        });
    }

    render() {
        //ES15 syntax to get everything required for Semantic UI from Table tag 
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    }
}

export default RequestIndex;