const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider); // web3 gets accounts and every other info requried to deploy on gancache test blockchain

const compiledFactory = require('../ethereum/build/ContractFactory.json');
const compiledContract = require('../ethereum/build/Contract.json');

let accounts;
let factory;
let contractAddress; // saves the contract address to interact
let contract;  // to save the instance of the contract smart contract from the factory

// to have a contract factory that already deployed everything for all the following "it" statements
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) // JSON needs to be parsed to javascript object
        .deploy({data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'});

        // Calls the functions on the contract that is already deployed
    await factory.methods.createContract('100').send({ // send is used as we are modifying the data
        from: accounts[0],
        gas: '1000000'
    });

    // Square brackets "ES16" to take the 'first' elemement from the right side and put it in left arrary.
    [contractAddress] = await factory.methods.getDeployedContracts().call(); // calls the method to get addresses that are deployed already
    // web3 creates the javascript based contract ...its different from above factory call. AS we already have the address
    contract = await new web3.eth.Contract(
        JSON.parse(compiledContract.interface), // JSON needs to be parsed to javascript object
        contractAddress                         // As the contract is already deployed with factory so we don't need to make a call to blockchain
    );
    
});
// Always think what are you going to rest the test for
// What behaviour do you care about ???
describe('Contracts', () => {
    it('deploys a factory and a contract', () => {
        assert.ok(factory.options.address);
        assert.ok(contract.options.address);
    });

    it('marks caller as the contract manager', async () => {
        const manager = await contract.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers', async () =>{
        await contract.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await contract.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await contract.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('alllows a manager to make payment request', async() =>{
        await contract.methods
            .createRequest('Buy batteries', '100', accounts[1])
            .send({
               from: accounts[0],
               gas: '1000000' 
        });
        const request = await contract.methods.requests(0).call();
        
        assert.equal('Buy batteries', request.description);
    });

    it('processes requests', async () => {
        await contract.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await contract.methods
            .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas: '1000000' });

        await contract.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '100000'
        });

        await contract.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 104);
    });
});