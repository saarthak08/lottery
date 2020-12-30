import React, { useState } from "react";
import lottery from "../utils/lottery";
import web3 from "../utils/web3";

const EntryForm = (props) => {
	const [inputEther, setInputEther] = useState("0.00");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const enterContest = async (e) => {
		e.preventDefault();
		if (parseFloat(inputEther) <= 0.01) {
			setError("Error! Entry value must be greater than 0.01 ether.");
			return;
		}
		if (props.players.includes(props.defaultAccount)) {
			setError("Already entered the contest!");
			return;
		} else {
			setLoading(true);
			lottery.methods
				.enter()
				.send({
					value: web3.utils.toWei(inputEther, "ether"),
					from: props.defaultAccount,
				})
				.catch((err) => {
					setLoading(false);
					setError(err.message);
				})
				.then((val) => {
					window.location.reload();
					setLoading(false);
				});
		}
	};

	return !loading ? (
		<div>
			<br></br>
			<h3>Entry Form!</h3>
			<form
				onSubmit={(e) => {
					enterContest(e);
				}}
			>
				<p>Enter entry amount in ether</p>
				<input
					type="number"
					step="0.01"
					placeholder="Entry amount in ether"
					value={inputEther}
					onChange={(e) => {
						e.preventDefault();
						setError("");
						setInputEther(e.target.value);
					}}
				></input>
				&nbsp;
				<button>Enter Contest</button>
				<br></br>
				<span style={{ color: "red" }}>{error}</span>
			</form>
		</div>
	) : (
		<div>
			<p>
				<h2>Please wait! Loading...</h2>
			</p>
		</div>
	);
};

export default EntryForm;
