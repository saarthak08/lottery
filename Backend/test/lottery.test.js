const assert = require("assert");
const ganache = require("ganache-cli");
const { abi, evm } = require("../compile");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
	accounts = await new web3.eth.getAccounts();

	lottery = await new web3.eth.Contract(abi)
		.deploy({ data: evm.bytecode.object })
		.send({ gas: 1000000, from: accounts[0] });
});

describe("Lottery Contract", () => {
	it("deploys a contract", () => {
		assert.ok(lottery.options.address);
	});

	it("allows multiple accounts to enter", async () => {
		await lottery.methods.enter().send({
			from: accounts[1],
			value: web3.utils.toWei("0.011", "ether"),
		});
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("0.011", "ether"),
		});

		const players = await lottery.methods.getPlayers().call({
			from: accounts[0],
		});

		assert.strictEqual(accounts[1], players[0]);
		assert.strictEqual(2, players.length);
	});

	it("requires a minimum amount of ether to enter the lottery", async () => {
		try {
			await lottery.methods.enter().send({
				from: accounts[0],
				value: 0,
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it("only manager can call pickWinner", async () => {
		try {
			await lottery.methods.pickWinner().send({
				from: accounts[1],
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it("sends money to lottery winner", async () => {
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei("2", "ether"),
		});
		const initialBalance = await web3.eth.getBalance(accounts[0]);
		await lottery.methods.pickWinner().send({
			from: accounts[0],
		});
		const finalBalance = await web3.eth.getBalance(accounts[0]);
		const difference = finalBalance - initialBalance;
		console.log(difference);
		assert(difference > web3.utils.toWei("1.8", "ether"));
	
	});
});
