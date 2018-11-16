log = console.log;

// step ONE - basic render

// var render = function (template, elem) {
//   var elem = document.querySelector(elem)
//   elem.innerHTML = template;
// }

// var template = '<h1>Hello, world!</h1>';
// render(template, '#app');

// step TWO - using a selector

// var render = function (template, elem) {
//   elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
//   elem.innerHTML = template;
// }

// var app = document.querySelector('#app');
// var template = '<h1>Hello, world!</h1>';
// render(template, app);

// step THREE - using a function

// var render = function (template, elem) {
//   elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
//   template = typeof template === 'function' ? template(template.state) : template;
//   elem.innerHTML = template;
// }

// var template = function () {
//   return '<h1>Hello, world!</h1>';
// } 
// render(template, '#app');

var posts;

var render = function (template, elem) {
  elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
  template = typeof template === 'function' ? template(template.state) : template;
  elem.innerHTML = template;
}

var fetchPosts = function (url, callback) {
  fetch(url)
  .then(response => response.json())
  .then( posts => callBack(posts) )
}

log(posts)

var template = function () {
  fetchPosts('https://jsonplaceholder.typicode.com/posts', posts => {
    var markup = posts.map(post => post.title)
    return markup;
  })

}

// {
// const markup = `
// <ul>
// ${posts.map(post => `
// <li>
// <h2>${post.title}</h2>
// <p>${post.body}</p>
// </li>
// `
// ).join('')}
// </ul>
// `
// return markup;
// }

render(template, '#app');

// function fetchRecipes(url, callback) {
//   fetch(url)
//   .then( res => res.json() )
//   .then( data => callback(data) )
//   .catch( (err) => { console.error(err)})
// }

// export default fetchRecipes;