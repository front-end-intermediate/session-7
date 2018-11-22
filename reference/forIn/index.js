import pirates from './sample-pirates-object.js';

// Cannot log this in the console
// console.log(pirates)

// What are the keys:
// console.log(Object.keys(pirates))

// Object.keys(pirates).map((key) => {
//   console.log(pirates[key].name)
// })

var elem = document.querySelector('#root');

// This will not work:

// const markup = `
// <ul>
// ${(pirates).map(
//   function(pirate) {
//     return `<li><a href="#0">${pirate.name}</a></li>` }
//   )}
// </ul>
// `;

// console.log(typeof(pirates))

// This will work

const markup = `
<ul>
${Object.keys(pirates).map(
  function(key) {
    return `<li><a href="#0">${pirates[key].name}</a></li>` }
  ).join('')}
</ul>
`;

console.log(markup)

elem.innerHTML = markup; 
    
