import web3 from './web3';
import Contract from './build/Contract.json'; // We need ABI to interact with the contract

// arrow function that gets called with address
export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Contract.interface),
        address
    );
};