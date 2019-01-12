import React, { Component } from 'react';
import factory from '../ethereum/factory'; //gets the instance to interact with the contract - web3 takes care of authentication


// class based component
class CampaignIndex extends Component {
    static async getInitialProps(){  // static is a class function and not instance. THis function is exclusive to NEST and is run without rendering the component
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return  {campaigns} ; // this is provided as props to our component and is read as {campaigns : campaigns}
    }
    
    render() {
        return <div>{this.props.campaigns[0]}</div>;
    }
}

// NEXT expect an export of react component

export default CampaignIndex;



