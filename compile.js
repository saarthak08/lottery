const fs = require("fs");
const path = require('path');
const solc = require('solc');
 
const contractPath = path.resolve(__dirname,"contracts","lottery.sol");

const source = fs.readFileSync(contractPath,"utf-8");

var input = {
    language:'Solidity',
    sources: {
        'lottery.sol': {
            content:source,
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports=output.contracts['lottery.sol']['Lottery'];

