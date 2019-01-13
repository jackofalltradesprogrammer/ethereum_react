// This components shows the details of deployed contract
import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'; // gets the arrow function defined in the campaign.js

class CampaignShow extends Component {
    //props will have the access to url being passed 
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        // pass the properties with names instead of the object which is difficult to understand
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
            </Layout>
        );
    }
}

export default CampaignShow;