const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider); // web3 gets accounts and every other info requried to deploy on gancache test blockchain

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress; // saves the campaign address to interact
let campaign;  // to save the instance of the campaign smart contract from the factory

// to have a campaign factory that already deployed everything for all the following "it" statements
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) // JSON needs to be parsed to javascript object
        .deploy({data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'});

        // Calls the functions on the contract that is already deployed
    await factory.methods.createCampaign('100').send({ // send is used as we are modifying the data
        from: accounts[0],
        gas: '1000000'
    });

    // Square brackets "ES16" to take the 'first' elemement from the right side and put it in left arrary.
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call(); // calls the method to get addresses that are deployed already
    // web3 creates the javascript based contract ...its different from above factory call. AS we already have the address
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface), // JSON needs to be parsed to javascript object
        campaignAddress                         // As the contract is already deployed with factory so we don't need to make a call to blockchain
    );
    
});
// Always think what are you going to rest the test for
// What behaviour do you care about ???
describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers', async () =>{
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('alllows a manager to make payment request', async() =>{
        await campaign.methods
            .createRequest('Buy batteries', '100', accounts[1])
            .send({
               from: accounts[0],
               gas: '1000000' 
        });
        const request = await campaign.methods.requests(0).call();
        
        assert.equal('Buy batteries', request.description);
    });
});