import web3 from './web3'; // we are getting the instance we created in web3.js file
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x84c8A43Ac4029EDe02FC5Ab6B9b1fd7d067715Cd'
);

export default instance;