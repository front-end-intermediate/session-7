import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm';

class PirateForm extends React.Component {
  render(){
    return (
      <div>
      <h2>Pirate Form Component</h2>
      <AddPirateForm addPirate={this.props.addPirate} />
      <button onClick={this.props.loadSamples}>Load Sample Pirates</button>`
      <h2>End Pirate Form Component</h2>
      </div>
      )
  }
}

export default PirateForm;