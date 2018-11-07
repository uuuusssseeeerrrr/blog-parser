const url = require('url');
const naverparser = require('./parser_module/naverparser');
const tistoryparser = require('./parser_module/tistoryparser');

module.exports = {
  parse: (_url) => {
    const parsedObj = url.parse(_url);
    let templateObj = {};
    if (parsedObj.host.includes('naver')) {
      templateObj = naverparser.parse(parsedObj);
    } else if (parsedObj.host.includes('tistory')) {
      templateObj = tistoryparser.parse(parsedObj);
    }
    return templateObj;
  },
};
