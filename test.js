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

// parser.parse('http://happygrammer.tistory.com/150');
const result = parser.parse('http://blog.daum.net/kkkho2/104?t__nil_best=down');
console.log(result.title);
console.log(result.content);
