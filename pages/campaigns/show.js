// This components shows the details of deployed contract
import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
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

    renderCards() {
        // Assign the values from this.props to the variables
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props; 

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            }
        ];
        // Card Group from semantic UI REACT
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default CampaignShow;