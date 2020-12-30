import web3 from "./web3";

const contractAddress = "0x98B14716AC956d4b43C1F73e6d780f1CAa00925e";

const abi = [
	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
	{
		inputs: [],
		name: "enter",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "getPlayers",
		outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "manager",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "pickWinner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "players",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
];

export default new web3.eth.Contract(abi, contractAddress);
