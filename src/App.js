import "./App.css";

//import React from "react";
import React, { useState, useEffect } from 'react';
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: [],
    };

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <div className="App">
        <section className="App-section">
          <div className="App-section-title"> Angelbotics Attendance</div>
            <div>
              <form>
                <input type="text" name="event" placeholder="Input Event Name Here" style={{ textAlign: 'center' }} />
                <br />
                <label>
                  <input type="radio" name="radio-group" value="checkin" />
                  Check In
                </label>
                <label>
                  <input type="radio" name="radio-group" value="checkout" />
                  Check Out
                </label>
              </form>
            </div>
          <br />
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}
          />
          <ResultContainerPlugin results={this.state.decodedResults} />
        </section>
      </div>
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    console.log("App [result]", decodedResult);

    let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    //if (decodedText != null) {
      this.setState((state, props) => {
        state.decodedResults.push(decodedResult);
        return state;
      });
    //}
  }
}

export default App;
