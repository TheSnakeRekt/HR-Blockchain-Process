const Web3 = require('web3');
const HR = (provider) => {return new Web3(provider)};
const HR_ADDRESS = '0xcbbfbafedb0eb83016d2a96a4e80d30b20fa3e30';
const ABI = [
    {"constant": false,"inputs": [{"name": "hash","type": "bytes32"}],"name": "apply","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},
    {"constant": true,"inputs": [{"name": "email","type": "string"}],"name": "getApplicationID","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}
];

export {
   HR,
   HR_ADDRESS,
   ABI
}

