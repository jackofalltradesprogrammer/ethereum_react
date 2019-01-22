const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); // extra helpers for file system

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // better than 'fs' node  as it makes it easier to delete the folder and everything inside it

const contractPath = path.resolve(__dirname, 'contracts', 'Contract.sol');
const source = fs.readFileSync(contractPath, 'utf8'); // read the file
const output = solc.compile(source, 1).contracts; // as there are two files coming from our contract

fs.ensureDirSync(buildPath); // Make sure the folder exist and if not then create it

// As the output contains two seperate objects so we need to loop it
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}