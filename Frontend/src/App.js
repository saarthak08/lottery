import React, { Component } from "react";
import lottery from "./lottery";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { manager: "" };
	}

	async componentDidMount() {
		console.log(lottery);
		const manager = await lottery.methods.manager().call();
		console.log(manager);
		this.setState({ manager });
	}

	render() {
		return (
			<div className="App">
				<p>Manager: {this.state.manager}</p>
			</div>
		);
	}
}

export default App;
