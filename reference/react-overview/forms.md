Disable page refresh:

`<form onSubmit={this.handleSubmit}>`

```js
handleSubmit = event => {
  event.preventDefault()
}
```

Log the target

```js
handleSubmit = event => {
  event.preventDefault()
  console.log(event.target)
  console.log(typeof(event.target)) // object
  console.log({target: event.target})
}
```

The first property is `input` and it has a value property.

`console.log(event.target[0].value)`

Add a `name` prop:

`<input type="text" name="username" />`

See form > elements > username

More direct:

`console.log( event.target.elements.username.value )`

In React we use refs to assign and access the inputMode:

```js
<input type="text" name="username"
ref={node => (this.inputNode = node)}  />
```

`console.log(this.inputNode.value)`

