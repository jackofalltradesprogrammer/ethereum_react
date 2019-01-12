import React, { Component } from 'react';
import factory from '../ethereum/factory'; //gets the instance to interact with the contract - web3 takes care of authentication


// class based component
class CampaignIndex extends Component {
    async componentDidMount()   {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        
        console.log(campaigns);
    }

    render() {
        return <div>Campaign Index!</div>
    }
}

// NEXT expect an export of react component

export default CampaignIndex;



