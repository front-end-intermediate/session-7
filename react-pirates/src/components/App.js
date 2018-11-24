import React, { Component } from 'react';
import Pirate from './Pirate';
import axios from 'axios';
import Header from './Header'
import PirateForm from './PirateForm';
import piratesFile from '../data/sample-pirates-object';

class App extends Component {
  
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    this.removePirate = this.removePirate.bind(this);
    this.state = {
      pirates: {},
      isLoading: false,
      error: null
    }
  }
  componentDidMount(){
    this.setState({ isLoading: true });
    axios.get('http://localhost:3005/api/pirates')
    .then(response => this.setState({
      pirates: response.data,
      isLoading: false
    }))
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }
  
  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="App">
      <Header />
      <ul>
      {
        Object.keys(this.state.pirates)
        .map( key => <Pirate 
          key={key}
          index={key}
          details={this.state.pirates[key]}
          removePirate={this.removePirate} /> )
        }
        </ul>
        <PirateForm 
        addPirate={this.addPirate} 
        // loadSamples={this.loadSamples} 
        />
        </div>
        );
      }
      
      // loadSamples(){
      //   this.setState({
      //     pirates: piratesFile
      //   })
      // }
      
      removePirate(key){
        const pirates = {...this.state.pirates}
        console.log(key)
        console.log(this.state.pirates)
        console.log(Object.keys(pirates[key]))
        // thisPirate = 
        // axios.get(`http://localhost:3005/api/pirates/${this._id}`)
        // .then(response => this.setState({
        //   pirates: response.data,
        //   isLoading: false
        // }))
        // delete pirates[key]
        // this.setState({pirates})
      }
      
      addPirate(pirate) {
        const pirates = {...this.state.pirates}
        const timestamp = Date.now()
        pirates[`pirate-${timestamp}`] = pirate
        this.setState({ pirates: pirates })
      }
      
    }
    
    export default App;
    