import React, { Component } from "react";
import lottery from "../utils/lottery";
import web3 from "../utils/web3";
import EntryForm from "./EntryForm";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			manager: "",
			players: [],
			defaultAccount: "",
			winningAmount: 0,
			loading: true,
		};
	}

	async componentDidMount() {
		const manager = await lottery.methods.manager().call();
		const defaultAccount = (await web3.eth.getAccounts())[0];
		const winningAmount = await web3.eth.getBalance(lottery.options.address);
		const players = await lottery.methods.getPlayers().call();
		this.setState({
			manager,
			defaultAccount,
			players,
			winningAmount: web3.utils.fromWei(winningAmount, "ether"),
			loading: false,
		});
	}

	render() {
		return !this.state.loading ? (
			<div>
				<p>
					Your account: <b>{this.state.defaultAccount}</b>
				</p>
				<p>
					Manager of this lottery is: <b>{this.state.manager}</b>
				</p>
				<p>
					Total Winning Amount: <b>{this.state.winningAmount} Ether</b>
				</p>
				<p>
					Total number of players in the lobby:{" "}
					<b>{this.state.players.length}</b>
				</p>
				<ul>
					{this.state.players.map((player, id) => {
						return <li key={id}>{player}</li>;
					})}
				</ul>
				<EntryForm
					defaultAccount={this.state.defaultAccount}
					players={this.state.players}
				/>
				<br></br>
				<br></br>
				{this.state.defaultAccount === this.state.manager ? (
					<button
						onClick={(e) => {
							e.preventDefault();
							this.setState({ loading: true });
							lottery.methods
								.pickWinner()
								.send({ from: this.state.defaultAccount })
								.then((val) => {
									window.location.reload();
									this.setState({ loading: false });
								})
								.catch((err) => {
									this.setState({ loading: false });
								});
						}}
					>
						Pick a Winner!
					</button>
				) : (
					<p></p>
				)}
			</div>
		) : (
			<div>
				<p>
					<h2>Please wait! Loading...</h2>
				</p>
			</div>
		);
	}
}

export default App;
