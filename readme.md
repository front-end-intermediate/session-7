# VIII - React Intro

## Homework


## Reading


## The Pirate Form

In `AddPirateForm` create a method on the class.

`AddPirateForm.js`:

```js
createPirate(e) {
  e.preventDefault();
  console.log('making a pirate')
}
```

e.g.:

```js
import React, { Component } from 'react';
import '../assets/css/AddPirateForm.css';

class AddPirateForm extends Component {

  createPirate(e) {
    e.preventDefault();
    console.log('making a pirate')
  }

  render(){
    return (
      <form onSubmit = { (e) => this.createPirate(e) }>
        <input type="text" placeholder="Pirate name" />
        <input type="text" placeholder="Pirate vessel" />
        <input type="text" placeholder="Pirate weapon" />
        <button type="submit">Add Pirate</button>
      </form>
      )
  }
}

export default AddPirateForm;
```

And test using the form interface.

Add [refs](https://facebook.github.io/react/docs/refs-and-the-dom.html) to the form to store references to the input:

```js
return (
  <form onSubmit={ (e) => this.createPirate(e) }>
    <input ref={ (input) => this.name = input } type="text" placeholder="Pirate name" />
    <input ref={ (input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
    <input ref={ (input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
    <button type="submit">Add Pirate</button>
  </form>
)
```

Go to the React dev tools, find the `AddPirateForm` component, `$r` in the console to see the inputs.

Create a `pirate` object in `AddPirateForm`'s `createPirate` function.

`AddPirateForm.js`:

```jsx
createPirate(e) {
  e.preventDefault();

  const pirate = {
    name: this.name.value,
    vessel: this.vessel.value,
    weapon: this.weapon.value,
  }
  console.log(pirate)
}
```

Test by entering a pirate in the form and examining the browser console.

## State

State is data at a particular moment in time. It’s the present “state” of your data. 

Today’s more popular JavaScript frameworks, including React and Vue, use state and components to make managing the UI easier.

With this approach, instead of targeting specific elements in the DOM and adjusting a class here or a style there, you treat your data, or state, as the single source of truth.

Update your state, render a fresh copy of the UI based on the new data, and move on. You never have to think about which element in the DOM to target or how it needs to change.

The key difference between props and [state](https://facebook.github.io/react-native/docs/state.html): 

* state is internal and controlled by the component itself
* props are external and controlled by whatever component renders the component. - [ref](http://buildwithreact.com/tutorial/state).

Get the pirate object into state.

We initialize the state in `App.js` to an empty object.

`App.js`:

```js
class App extends Component {

constructor() {
  super();
  this.state = {
    pirates: {}
  }
}
```

(For `super()` review `reference/classes`.)

In React tools, find `App` note the `state` entry.

And add a method to `App.js` using the date method to create a unique identifier.

`App.js`:

```js
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
```

(For spread operator see: `reference / spread-operator.html`.)

Bind the add form to our app in `App.js`:

```js
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
```

React does not implicitly bind the methods to the component itself - you need to bind them. Inside the constructor `this` is bound to the app component.

### Review

Super extends the app component.

Review `super` in classes: `reference / extending-classes.html`

Note - `bind()` - creates a new function that, when called, has its `this` keyword set to the provided value.

See: `reference / bind / index.html` and `reference / bind / button.html`

## State continued

Our `createPirate` function in `AddPirateForm` is called and works but it does not save the new pirate.

We have an `addPirate` function in App.js:

```js
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
```

Unlike the `createPirate` function, it stores the new pirate in `state`. Test with `App` in React tool:

`$r.addPirate({name: 'joe'})`

### Passing Props

`App.js`:

```js
<PirateForm tagline="Ahoy Pirate Form" childTagline="Ahoy Add Pirate Form" />
```

`PirateForm.js`:

```js
<h3>{this.props.tagline}</h3>
<AddPirateForm tagline={this.props.childTagline} />
```

`AddPirateForm.js`:

```js
<h3>{this.props.tagline}</h3>
```

### Passing a Function via props

We need to make the `addPirate` function in `App.js` available to the `AddPirateForm` by using props passing:

`App.js > PirateForm > AddPirateForm`

* To `PirateForm` from `App.js` we will use `<PirateForm addPirate={this.addPirate} />`:

```js
  render() {
    return (
      <div className="App">
      <Header />
      <Pirate tagline="Ahoy there matey!" />
      <PirateForm addPirate={this.addPirate} />
      </div>
      );
  }
```

Examine the `PirateForm` props in React tool.

Only one level more. Pass the prop to `AddPirateForm` from `PirateForm` with `<AddPirateForm addPirate={this.props.addPirate} />`:

```js
import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm'

class PirateForm extends Component {
  render() {
    return (
      <div className="pirate-form">
      <h3>Pirate Forms</h3>
      <AddPirateForm addPirate={this.props.addPirate} />
      </div>
      )
  }
}

export default PirateForm;
```

Examine the `AddPirateForm` props in React's inspector. Note the property.

Since there is no reference to `AddPirateForm` in `App.js` we needed to perform this props pass via `PirateForm`.

We will use `createPirate` to develop a pirate instance and then pass the result to addPirate to store the instance in state.

In `AddPirateForm`:

`this.props.addPirate(pirate);`

```js
  createPirate(e) {
    e.preventDefault();
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
  }
```

We should now be able to create a pirate using the form and see it in the React browser extension when examining `App`.

## Resetting the Form

We have refs on the input fields. When we click "Add Pirate" the form still holds the data so we need to reset it.

Empty the form by assigning a [ref](https://facebook.github.io/react/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component) to the input fields.

* `AddPirateForm.js`:

`<form ref={ (input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

```js
    return (
      <form ref={ (input)=>this.pirateForm = input } onSubmit={ (e) => this.createPirate(e) }>
        <input ref={ (input) => this.name = input } type="text" placeholder="Pirate name" />
        <input ref={ (input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
        <input ref={ (input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
        <button type="submit">Add Pirate</button>
      </form>
      )
```

and `this.pirateForm.reset();`:

```js
createPirate(e) {
    e.preventDefault()

    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }

    this.props.addPirate(pirate)
    this.pirateForm.reset()
  }
```

The form should now empty and the `addPirate` function is called to store our pirate in state.

## Displaying Pirates

We can add pirates to state but cannot see them in the UI. Let's create an unordered list in `Pirate.js`.

* `Pirate.js`:

```js
class Pirate extends Component {
  render(){
    return (
      <div className='pirate'>
        <ul>
          <li>Pirate</li>
        </ul>
      </div>
      )
  }
}
```

## Sample Pirates

Using a JSON Array in `Pirate.js`.

Examine the sample files in the `data` folder. Ensure that the data folder is inside `src`.

We will use [JSON stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) to get a quick look at our pirates.

`JSON.stringify(<data-that-you-want-to-stringify>,<replacer-function-null>,<indentation>)`

* `Pirate.js`:

```js
import piratesFile from '../data/sample-pirates-array';
```

Add `<pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre>`:

```jsx
import React, { Component } from 'react';
import piratesFile from '../data/sample-pirates-array'
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <div className='pirate'>
        <ul>
          <li><pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre></li>
        </ul>
      </div>
      )
  }
}

export default Pirate;
```

With `Array.map()`:

`array.map()` to create components.

Review Example - Doubling numbers:

```js
var numbers = [1,5,8]
numbers
numbers.map(function(number){return number * 2})
const double = function(number){return number * 2}
double(5)
numbers.map(double)
```

* `Pirate.js`:

```js
<ul>
{piratesFile.pirates.map(function(pirate){
  return (
    <li>
    <h4>{pirate.name}</h4>
    </li>
  )
})}
</ul>
```

Rollback the Pirate component to its original state.

* `Pirate`:

```js
import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <div className='pirate'>
      <p>{this.props.tagline}</p>
      </div>
      )
  }
}

export default Pirate;
```

This time we will import the data into `App.js` as an object. Switch the array out for the object version of the pirate samples.

`App.js`:

```js
import piratesFile from './data/sample-pirates-object';
```

### Object.keys()

For this version of sample-pirates we cannot directly use `.map` which is a method on the Array prototype - not the Object prototype.

We will use `Object.keys()` to return an array before mapping the array. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) article on Object keys.

See `reference > forIn`

```js
> var arr = [1,2,3]
> Object.keys(arr)
```

Massage the `<Pirate />` component in `App.js` to enable the use of `.map()`.

`App.js`:

```js
render() {
  return (
    <div className="App">
    <Header />
    <ul>
    {
      Object.keys(this.state.pirates)
      .map( key => <Pirate key={key} /> )
    }
    </ul>
    <PirateForm addPirate={this.addPirate} />
    </div>
    );
  }

```

And edit to use the key to pass a details prop to the Pirate component using:

`.map( key => <Pirate key={key} details={this.state.pirates[key]}`

`App.js`:

```js
  render() {
    return (
      <div className="App">
      <Header />

      <ul>
      {
        Object.keys(this.state.pirates)
        .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
      }
      </ul>

      <PirateForm addPirate={this.addPirate} />
      </div>
    );
  }
```

* `Pirate.js`:

```js
import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
        <li>{this.props.details.name}</li>
    )
  }
}

export default Pirate;
```

Create a new pirate using the form.

Add an object with the details to the Pirate properties and a few more display entries shortening them with a variable: `const { details } = this.props;`.

* `Pirate.js`:

```js
import React, { Component } from 'react';
import '../assets/css/Pirate.css'

class Pirate extends Component {
  render(){
    const { details } = this.props;
    return (
      <div className='pirate'>
      <ul>
      <li>{details.name}</li>
      <li>{details.weapon}</li>
      <li>{details.vessel}</li>
      </ul>
      </div>
      )
  }
}
export default Pirate;
```

Test again using the form.

### Load sample data via PirateForm

Recall we imported the pirates data in `App.js`:

`import piratesFile from './data/sample-pirates-object'`

Create a new method in `App.js`:

```js
loadSamples(){
  this.setState({
    pirates: piratesFile
  })
}
```

Bind it in the constructor:

```js
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.state = {
      pirates: {}
    }
  }
```

We will use a button in `PirateForm`:

`<button onClick={this.props.loadSamples}>Load Sample Pirates</button>`:

```js
render() {
  return (
    <div className="pirate-form">
    <h3>Pirate Forms</h3>
    <AddPirateForm addPirate={this.props.addPirate} />
    <button onClick={this.props.loadSamples}>Load Sample Pirates</button>
    </div>
    )
}
```

The `PirateForm.js` will need access to this method.

Add `loadSamples={this.loadSamples}` to props.

* `App.js`:

`<PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />`:

```js
render() {
  return (
    <div className="App">
    <Header />
    <button onClick={this.loadSamples}>Load Sample Pirates</button>
    {
      Object
      .keys(this.state.pirates)
      .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
    }
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
    </div>
    );
  }
}
```

Test the button. Now you can load sample pirates from the pirate form.

Test the form.

### Remove Pirate

Add a new method to `App.js`:

```js
removePirate(key){
  const pirates = {...this.state.pirates}
  delete pirates[key]
  this.setState({pirates})
}
```

Bind it to the constructor in App:

```js
this.removePirate = this.removePirate.bind(this);
```

`$r` App to see the results:

```js
$r.removePirate('pirate1')
```

We will locate the control to remove pirates in the `Pirate.js` component.

Pass the prop to `Pirate` from App using `removePirate = {this.removePirate}`:

* `App.js`:

```js
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate 
    key = { key }
    details = {this.state.pirates[key]}
    removePirate = {this.removePirate} /> )
}
```

Note:

```js
details = {this.state.pirates[key]}
```

<!-- We could also pass the prop to `PirateForm` from `App`:

```js
<PirateForm
addPirate={this.addPirate}
removePirate={this.removePirate}
loadSamples={this.loadSamples} />
```

And delete a pirate from there.

* PirateForm

`<button onClick={() => this.props.removePirate('pirate1')}>X</button>`

Test. This only removes pirate1. -->

Since we want the controls to be associated with each Pirate entry we'll add them to the `Pirate` component by including a new list item: `<li><button onClick={() => this.props.removePirate('pirate1')}>X</button></li>`.

* `Pirate.js`:

```js
return (
  <div className="pirate">
  <ul>
    <li>{details.name}</li>
    <li>{details.weapon}</li>
    <li>{details.vessel}</li>
    <li><button onClick={() => this.props.removePirate('pirate1')}>X</button></li>
  </ul>
  </div>
  )
```

We have temorarily hard coded the button to remove just one pirate from the list.

Load pirates and examine the state in App.

Pass it along as part of the Pirate component `index={key}` in App.

* `App.js`:

```js
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate 
    key={key}
    index={key}
    details={this.state.pirates[key]}
    removePirate={this.removePirate} /> )
}
```

Pass the index value of the pirate in question to the method:

* `Pirate`:

```html
<ul>
  <li>{details.name}</li>
  <li>{details.weapon}</li>
  <li>{details.vessel}</li>
  <li><button onClick={() => this.props.removePirate(this.props.index)}>X</button></li>
</ul>
```

Now we can add and delete any pirate.

But aren't we already passing along a key? Why do we need an index?

Try this is `Pirate.js`:

```js
<li><button onClick={() => this.props.removePirate(this.props.key)}>X</button></li>
```

and note the error message.

https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/


<!-- 
### Persisting the Data

1. Create an account at [Firebase](https://firebase.com/)
1. Create a new project called `<firstname>-<lastname>-pirates`
1. Create Project
1. Go to the empty database (left hand menu)

Click on Rules at the top.

Change this:

```js
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

To this:

```js
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

and click Publish.

Examine `App.js` state. Any change to pirates needs to be made to firebase.

## Rebase

in src create `base.js`

```js
import Rebase from 're-base'

const base = Rebase.createClass({

})

export default base;
```

[Rebase](https://www.npmjs.com/package/rebase) is a simple utility that we are going to need to massage strings.

In a new terminal cd into `react-pirates` and run:

`$ npm install re-base@2.2.0 --save`

### Add domain, database URL, API key.

In Firebase click on `Overview > Add Firebase to your webapp`

We only need:

```js
apiKey: "xxx",
authDomain: "xxx",
databaseURL: "xxx",
```

Edit `base.js` with the information, e.g. (DO NOT COPY THE THREE SETTING - USE YOUR OWN):

```js
import Rebase from 're-base'

const base = Rebase.createClass({
  apiKey: "AIzaSyAHnKw63CUBAqSuCREgils_waYJ0qwpGiU",
  authDomain: "daniel-deverell-pirates.firebaseapp.com",
  databaseURL: "https://daniel-deverell-pirates.firebaseio.com",
})

export default base
```

Import into `App.js`:

`import base from './base'`

## React Component Lifecycle

[Documentation](https://reactjs.org/docs/react-component.html).

* component will mount - hooks into component before it is displayed.

* `App.js`:

```js
componentWillMount(){
  this.ref = base.syncState(`< first name >-<last name>-pirates/pirates`, {
    context: this,
    state: 'pirates'
  })
}
```

_Note - fill in the first and last name fields._

And for good measure, remove the binding when the component is unmounted:

```js
componentWillUmount(){
  base.removeBinding(this.ref)
}
```

Load pirates and examine the Firebase HTML5 websockets.

To delete a pirate we need to accomodate Firebase.

* `App.js`:

```js
removePirate(key){
  const pirates = {...this.state.pirates}
  pirates[key] = null
  this.setState({pirates})
}
```

## summer2018 Stop here

Move on to [session 12](https://github.com/front-end-intermediate/session-12#bi-directional-data)

Pirate.js

```js
const myColor = '#C90813'

const myStyle={
  color: myColor
}
```

Examine Code. Commit and push to github.

### Routing

[Quick start](https://reacttraining.com/react-router/web/guides/quick-start)

`npm install react-router-dom --save`

* `index.js`:

```js
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class Main extends React.Component {
  render() {
    return (
    <Router>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </Router>
      )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
  );
```

### Pirate Detail

Use Header.js as a template

```js
import React, { Component } from 'react'

class PirateDetail extends Component {
  render() {
    return (
      <div className="pirate-detail">
        <h1>Pirate detail</h1>
      </div>
      )
  }
}

export default PirateDetail;
```

`<Route path="/pirate/:pid" component={PirateDetail} />`:

```js
import PirateDetail from './PirateDetail';

class Main extends React.Component {
  render() {
    return (
    <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/pirate/:pid" component={PirateDetail} />
    </div>
  </Router>
      )
  }
}
```

We probably want the routing to occur in `App.js` to keep the header and replace `<Pirate />` and `<PirateForm />` -->

## Notes