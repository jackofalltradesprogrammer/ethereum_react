import web3 from './web3'; // we are getting the instance we created in web3.js file
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x3a04C354DDa5A905e92E9BA33093E39A3F512b34'
);

export default instance;