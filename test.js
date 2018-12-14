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

parser.parse('https://medium.com/@minsoogwak/i-am-a-full-stack-developer-836119359410').then((value) => {console.log(value)});
// const result = parser.parse('https://blog.naver.com/pjh731/221419121474');
// const result2 = parser.parse('https://medium.com/s/story/the-monstrous-immorality-of-creating-genetically-engineered-babies-6c7e409c9490');
// console.log(result.title);
// console.log(result.content);
