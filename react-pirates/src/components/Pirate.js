import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <li>
        { this.props.details.name }
      </li>
      )
  }
}

export default Pirate;