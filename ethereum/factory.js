import web3 from './web3'; // we are getting the instance we created in web3.js file
import ContractFactory from './build/ContractFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(ContractFactory.interface),
    '0xafA0a843d2aB22c5b16DBD749E9FdaE1527ABc09'
);

export default instance;