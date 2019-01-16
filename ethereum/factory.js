import web3 from './web3'; // we are getting the instance we created in web3.js file
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xe77D720008827A0870769f621fda8b37f603F3A4'
);

export default instance;