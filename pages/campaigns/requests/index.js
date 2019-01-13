//to show List of Requests on this component
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestIndex extends Component {
    // this function provided by NEXT can be used to pull info from the address bar
    static async getInitialProps(props) {
        const { address} = props.query; // address variable is like a wildcard defined in the route.js

        return { address }; // its read as address: address

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