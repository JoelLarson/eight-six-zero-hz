import React from 'react';

function filterResults(results) {
    let filteredResults = [];
    for (var i = 0; i < results.length; ++i) {
        if (i === 0) {
            filteredResults.push(results[i]);
            continue;
        }

        if (results[i].decodedText !== results[i-1].decodedText) {
            filteredResults.push(results[i]);
        }
    }
    return filteredResults;
}

class ResultContainerTable extends React.Component {
  render() {
    var results = filterResults(this.props.data);
    var decodedTexts = results.map(result => {
      // Split the decodedText string by the '=' delimiter
      var splitDecodedText = result.decodedText.split('=');
      // Return the second column of data
      return splitDecodedText[1];
    });
    return (
      <table className={'Qrcode-result-table'}>
        <thead>
          <tr>
            <td>Event Name</td>
            <td>Badge ID</td>
            <td>Check In/Out</td>
          </tr>
        </thead>
        <tbody>
          {decodedTexts.reverse().map((decodedText, i) => (
            <tr key={i}>
              <td>{this.props.eventName}</td>
              <td>{decodedText}</td>
              <td>{this.props.radioGroup}</td>
             </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class ResultContainerPlugin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      radioGroup: '',
    };
  }

  handleEventChange = (event) => {
    this.setState({ eventName: event.target.value });
  };

  handleRadioGroupChange = (event) => {
    this.setState({ radioGroup: event.target.value });
  };

  render() { 
    let results = filterResults(this.props.results);
    return (
      <div className='Result-container'>
        <div className='Result-header'>Badges Scanned: ({results.length})</div>
        <div className='Result-section'>
          <div>
            <form>
              <input type="text" name="event" placeholder="Input Event Name Here" style={{ textAlign: 'center' }} onChange={this.handleEventChange}/>
              <br />
              <label>
                <input type="radio" name="radio-group" value="checkin" onChange={this.handleRadioGroupChange} />
                Check In
              </label>
              <label>
                <input type="radio" name="radio-group" value="checkout" onChange={this.handleRadioGroupChange} />
                Check Out
              </label>
            </form>
          </div>
          <ResultContainerTable
            data={this.props.results}
            eventName={this.state.eventName}
            radioGroup={this.state.radioGroup}
            />
        </div>
      </div>
    );
  }
}

export default ResultContainerPlugin;
