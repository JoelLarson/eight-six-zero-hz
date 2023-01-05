import React from 'react';

class ResultContainerTable extends React.Component {
  render() {
    const entries = this.props.attendanceEntries.reverse().map((entry, index) => {
      return (
        <tr key={index}>
          <td>{entry.eventName}</td>
          <td>{entry.badgeId}</td>
          <td>{entry.action}</td>
        </tr>
      );
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
          {entries}
        </tbody>
      </table>
    );
  }
}

class ResultContainerPlugin extends React.Component {
  render() {
    return (
      <div className='Result-container'>
        <div className='Result-header'>Badges Scanned: ({this.props.attendanceEntries.length})</div>
        <div className='Result-section'>
          <ResultContainerTable
            attendanceEntries={this.props.attendanceEntries}
          />
        </div>
      </div>
    );
  }
}

export default ResultContainerPlugin;
