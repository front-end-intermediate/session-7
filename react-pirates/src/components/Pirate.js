import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <div className='pirate'>
        <p>{this.props.tagline}</p>
        <ul>
          <li>{this.props.details.name}</li>
        </ul>
      </div>
      )
  }
}

export default Pirate;