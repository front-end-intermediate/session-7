# Creating reusable React components

Extract the component to a variable - add:

`const helloWorld = <div>Hello World</div>`

And render it:

```js
  <div className="container">
    { helloWorld }
    { helloWorld }
  </div>
```

Reuse and parameterize code:

`const message = (props) => <div>{props.msg}</div>`

Render them

```js
const rootElement = document.getElementById('root')

const message = (props) => <div>{props.msg}</div>

const elem = (
  <div className="container">
    { message ({ msg: 'Hellow World' })}
    { message ({ msg: 'Goodbye World' })}
  </div>
)

ReactDOM.render(elem, rootElement)
```

JSX compiles down to `React.createElement` calls.

`React.createElement` can take a function and pass props down to the function.

```js
  <div className="container">
    { React.createElement(message, { msg: 'Hello World' })}
    { React.createElement(message, { msg: 'Goodbye World' })}
  </div>
```

Note the error:

 ```js
  <div className="container">
  <message />
    { React.createElement(message, { msg: 'Hello World' })}
    { React.createElement(message, { msg: 'Goodbye World' })}
  </div>
```

Try putting messsage into the Babel Repl

```js
"use strict";

React.createElement("message", null);
```

In JSX to differentiate between a variable and a DOM element you need to capitalize the component.

Try in Repl:

```js
const message = (props) => <div>{props.msg}</div>;
<message />
```

v.s.

```js
const Message = (props) => <div>{props.msg}</div>;
<Message />
```

Remove some of the JS in favor of JSX and capitalize the variable name:

```js
const rootElement = document.getElementById('root')

const Message = (props) => <div>{props.msg}</div>

const elem = (
  <div className="container">
    <Message msg='Hello World' />
    <Message msg='Goodbye World' />
  </div>
)

ReactDOM.render(elem, rootElement)
```

We can use the child prop like this:

```js
const rootElement = document.getElementById('root')

const Message = (props) => <div>{props.children }</div>

const elem = (
  <div className="container">
    <Message children ='Hello World' />
    <Message children ='Goodbye World' />
  </div>
)

ReactDOM.render(elem, rootElement)
```

Or like this:

```js
  <div className="container">
    <Message>Hello World</Message>
    <Message>Goodbye World</Message>
  </div>
```

