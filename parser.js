const url = require('url');
const naverParser = require('./parser_module/naverParser');
const tistoryParser = require('./parser_module/tistoryParser');
const commonParser = require('./parser_module/commonParser');

module.exports = {
  parse: (_url) => {
    const parsedObj = url.parse(_url);
    let templateObj = {};
    if (parsedObj.host.includes('naver')) {
      templateObj = naverParser.parse(parsedObj);
    } else if (parsedObj.host.includes('tistory')) {
      templateObj = tistoryParser.parse(parsedObj);
    } else {
      templateObj = commonParser.parse(parsedObj);
    }
    return templateObj;
  },
};
