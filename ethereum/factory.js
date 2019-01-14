import web3 from './web3'; // we are getting the instance we created in web3.js file
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9299581fDFC7501F345B5cFc440dA6dbF1dDCE2f'
);

export default instance;