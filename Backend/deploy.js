const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const { abi, evm } = require("./compile");

const walletProvider = new HDWalletProvider(
	"mnemonics-of-account",
	"network-url");

const web3 = new Web3(walletProvider);

const deploy = async () => {
	const accounts = await new web3.eth.getAccounts();
	console.log("Deploying from account: " + accounts[0]);

	const result = await new web3.eth.Contract(abi)
		.deploy({ data:"0x"+ evm.bytecode.object })
		.send({ gas: 1000000, from: accounts[0] });

	console.log("Contract deployed to: " + result.options.address);
};

deploy();
