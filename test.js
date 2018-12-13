const parser = require('./parser');
// const tagoption = {
//   title: {
//     name: 'post-title',
//     type: 'class',
//   },
//   content: {
//     name: 'entry-content',
//     type: 'class',
//   },
// };

parser.parse('http://blog.daum.net/mc529/1410').then(value => {
  console.log(value);
});
// const result2 = parser.parse('https://medium.com/s/story/the-monstrous-immorality-of-creating-genetically-engineered-babies-6c7e409c9490');
// console.log(result.title);
// console.log(result.content);
