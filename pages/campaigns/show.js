// This components shows the details of deployed contract
import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'; // gets the arrow function defined in the campaign.js

class CampaignShow extends Component {
    //props will have the access to url being passed 
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        console.log(summary);

        return {};
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