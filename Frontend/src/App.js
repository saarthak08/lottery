import React, { Component } from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { manager: "", players: [], defaultAccount: "" };
	}

	async componentDidMount() {
		const manager = await lottery.methods.manager().call();
		const defaultAccount = (await web3.eth.getAccounts())[0];
		const players = await lottery.methods.getPlayers().call();
		this.setState({ manager, defaultAccount, players });
	}

	render() {
		return (
			<div className="App">
				<p>
					Your account: <b>{this.state.defaultAccount}</b>
				</p>
				<p>
					Manager of this lottery is: <b>{this.state.manager}</b>
				</p>
				<p>
					Total number of players in the lobby:{" "}
					<b>{this.state.players.length}</b>
				</p>
				<ul>
					{this.state.players.map((player) => {
						return <li>{player}</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default App;
