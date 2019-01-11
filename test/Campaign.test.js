const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress; // saves the campaign address to interact
let campaign;  // to save the instance of the campaign smart contract from the factory

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'});

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // Square brackets "ES16" to take the first elemement from the right side and put it in left arrary.
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface), // JSON needs to be parsed to javascript object
        campaignAddress                         // As the contract is already deployed with factory so we don't need to make a call to blockchain
    );
    
});