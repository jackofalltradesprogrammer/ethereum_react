//to show List of Requests on this component
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';

class RequestIndex extends Component {
    // this function provided by NEXT can be used to pull info from the address bar
    static async getInitialProps(props) {
        const { address} = props.query; // address variable is like a wildcard defined in the route.js
        const campaign = Campaign(address); // pass teh address to the arrow function to Campaign and get the instance

        const requestCount = await campaign.methods.getRequestsCount().call();
        // Array(count).fill.map() runs number of times starting from 0 and more and gets the elements
        const requests = await Promise.all(
          Array(parseInt(requestCount)).fill().map((element, index) => {
              return campaign.methods.requests(index).call()
          })  
        );


        return { address, requests, requestCount }; // its read as address: address

    }
    render() {
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;