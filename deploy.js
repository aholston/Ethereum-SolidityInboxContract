const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mnemonic = 'artist muscle verify net capital rival infant deal cabbage ozone record discover';
const endpoint = 'https://rinkeby.infura.io/v3/b8b01747724441e1a9e671114ceb408d';
const initialMessage = 'Hello World';

const provider = new HDWalletProvider(
    mnemonic,
    endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ 
            data: bytecode, 
            arguments: [initialMessage]
         })
         .send({ 
             gas: '1000000',
             from: accounts[0]
          });

    console.log('Contract deployed at address:', result.options.address);
}

deploy();
