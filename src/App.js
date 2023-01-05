import "./App.css";

import React from 'react';
import { Html5QrcodePlugin } from './Html5QrcodePlugin';
import ResultContainerPlugin from "./ResultContainerPlugin";
import { Html5QrcodeSupportedFormats } from "html5-qrcode";
import { AttendanceEntry } from "./Attendance";

const QRCODE_PLUGIN_CONFIG = {
	fps: 5,
	qrbox: 250,
	disableFlip: false,
	zoom: 20,
	formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ]
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			attendanceEntries: [],
			lastMatchedText: null,
			eventName: null,
			action: null
		};

		this.handleEventNameChange = this.handleEventNameChange.bind(this);
		this.handleActionChange = this.handleActionChange.bind(this);

		this.submitAttendanceEntry = this.submitAttendanceEntry.bind(this);
	}

	handleEventNameChange(event) {
		this.setState({eventName: event.target.value});
	}

	handleActionChange(event) {
		this.setState({action: event.target.value});
	}

	submitAttendanceEntry(decodedText, decodedResult) {
		console.log("QR Badge Parser [result]", ...arguments);

		this.setState((state, props) => {
			// const badgeData = decodedText.split('=');
			const badgeData = ["a", "b"];

			const entry = new AttendanceEntry(state.eventName, badgeData[1], state.action);

			console.log('Adding new Attendance Entry: ', entry);

			const output = {
				lastMatchedText: decodedText,
				attendanceEntries: [
					...state.attendanceEntries,
					entry
				]
			};

			console.log(output);

			return output;
		});
	}

	render() {
		return (
			<div className="App">
				<section className="App-section">
					<h1 className="App-section-title">Angelbotics Attendance</h1>

					<Html5QrcodePlugin
						elementId="main-reader"
						config={QRCODE_PLUGIN_CONFIG}
						onCodeScanned={this.submitAttendanceEntry}
						className="main-reader"
					/>

					<form onSubmit={(e) => { e.preventDefault(); }}>
						<label>
							Input Event Name Here
							<input type="text" name="eventName" id="eventName" className="input" style={{ textAlign: 'center' }} onChange={this.handleEventNameChange} />
						</label>

						<label>
							Check In
							<input type="radio" name="action" id="checkInAction" className="radio-group" value="checkin" onChange={this.handleActionChange} />
						</label>

						<label>
							Check Out
							<input type="radio" name="action" id="checkOutAction" className="radio-group" value="checkout" onChange={this.handleActionChange} />
						</label>
					</form>

					<ResultContainerPlugin attendanceEntries={this.state.attendanceEntries} />
				</section>
			</div>
		);
	}
}

export default App;
