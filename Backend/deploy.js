const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const { abi, evm } = require("./compile");

const walletProvider = new HDWalletProvider(
	"share planet hollow clog cargo multiply shrimp flee apart rule exist axis",
	"https://rinkeby.infura.io/v3/47a815f55cdf4d51a57fa94cc702b67a"
);

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
