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

const result = parser.parse('http://blog.daum.net/dywjd9090/5718?bt_nil_d=1129_4');
const result2 = parser.parse('https://medium.com/s/story/the-monstrous-immorality-of-creating-genetically-engineered-babies-6c7e409c9490');

console.log(result);
// console.log(result.title);
// console.log(result.content);
