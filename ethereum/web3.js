import Web3 from 'web3';

// people definitely need to have Metamask for it to work
// const web3 = new Web3(window.web3.currentProvider);

let web3; // we can resign this variable

// Check if we are in the browser and if metamask is present
if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
}else { // we are on the server or  the user is not running metamask
    const provider = new Web3.provider.HttpProvider(
        https://rinkeby.infura.io/v3/a9ee51eb0dd04456942f5bde2edb91b1
    );
    web3 = new Web3(provider);
}

export default web3;