// This components shows the details of deployed contract
import React, { Component } from 'react';
import Layout from '../../components/Layout';

class CampaignShow extends Component {
    //props will have the access to url being passed 
    static async getInitialProps(props) {
        console.log(props.query.address);

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