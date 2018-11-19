Vanilla to React:

```html
<script type="text/javascript">
```

```js
const rootElement = document.getElementById('root')

const element = React.createElement('div', {
  className: 'container',
  children: 'Hello World',
})

ReactDOM.render(element, rootElement)
```

Transpiling with babel:

```html
<script type="text/babel">
```

```js
const rootElement = document.getElementById('root')

const elem = <div className="container">Hello World</div>

ReactDOM.render(elem, rootElement)
```

Externalize to variables:


```js
const rootElement = document.getElementById('root')

const content = 'Hello World'
const myClassName = 'container'

const elem = <div className={myClassName}>{content}</div>

ReactDOM.render(elem, rootElement)
```

The curly braces are JS and ust evaluate to an expression.

So, for example, we could use an IIFE:

```js
const rootElement = document.getElementById('root')

const content = 'Hello World'
const myClassName = 'container'

const elem = <div className={myClassName}>{(() => content)()}</div>

ReactDOM.render(elem, rootElement)
```

With React it is common to use a `props` object for variables:

```js
const rootElement = document.getElementById('root')

const props = {
  className: 'container',
  children: 'Hello World',
}

const element = <div {...props} />

ReactDOM.render(element, rootElement)
```

Object spread in JS to spread the props into the element.

Using a default class name:

```js
const element = <div className="myClass" {...props} />
```

Overriding a class name:

```js
const element = <div {...props} className="myClass" />
```

Overriding children props:

```js
const element = <div {...props} className="myClass">Hi There</div>
```