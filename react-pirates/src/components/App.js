import React, { Component } from 'react';
import Pirate from './Pirate'
import Header from './Header'
import PirateForm from './PirateForm';
import piratesFile from '../data/sample-pirates-object';

class App extends Component {
  
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.removePirate = this.removePirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
  
  render() {
    return (
      <div className="App">
      <Header />
      <ul>
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate 
    key={key}
    index={key}
    details={this.state.pirates[key]}
    removePirate={this.removePirate} /> )
}
        </ul>
        <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
        </div>
        );
      }
      
      loadSamples(){
        this.setState({
          pirates: piratesFile
        })
      }
      
      removePirate(key){
        const pirates = {...this.state.pirates}
        delete pirates[key]
        this.setState({pirates})
      }
      
      addPirate(pirate) {
        //take a copy of the current state and put it into pirates var
        const pirates = {...this.state.pirates}
        //create a unique id
        const timestamp = Date.now()
        //add new pirate using accessor and id - objectName["propertyName"] and assignment
        pirates[`pirate-${timestamp}`] = pirate
        //set state pirates with var pirates
        this.setState({ pirates: pirates })
      }

      // componentWillMount(){
      //   this.ref = base.syncState(`daniel-deverell-pirates/pirates`, {
      //     context: this,
      //     state: 'pirates'
      //   })
      // }
      
    }
    
    export default App;
    