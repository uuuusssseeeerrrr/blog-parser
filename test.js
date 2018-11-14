const parser = require('./parser');

const tagoption = {
  title: {
    name: 'post-title',
    type: 'class',
  },
  content: {
    name: 'entry-content',
    type: 'class',
  },
};

// parser.parse('http://happygrammer.tistory.com/150');
parser.parse('https://blog.naver.com/kyozzang20/221326854125', null, tagoption);
