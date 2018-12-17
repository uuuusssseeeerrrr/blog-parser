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

// parser.parse('https://blog.naver.com/kyozzang20/221326855122');
parser.parse('http://growinglastcanyon.tistory.com/10').then((result) => {
  console.log(result);
});

// parser.parse('https://blog.naver.com/pjh731/221419121474').then((obj) => {
// console.log(obj);
// });
// const result2 = parser.parse('https://medium.com/s/story/the-monstrous-immorality-of-creating-genetically-engineered-babies-6c7e409c9490');
// console.log(result.title);
// console.log(result.content);
