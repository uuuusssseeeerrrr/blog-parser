const url = require('url');
const naverParser = require('./parser_module/naverParser');
const tistoryParser = require('./parser_module/tistoryParser');
const daumParser = require('./parser_module/daumParser');
const commonParser = require('./parser_module/commonParser');
const mediumParser = require('./parser_module/mediumParser');
const bloggerParser = require('./parser_module/bloggerParser');


module.exports = {
  parse: (_url, type, TagOptions) => {
    let templateObj;
    const parsedObj = url.parse(_url);
    if (parsedObj.host.includes('naver') || type === 'naver') {
      templateObj = naverParser.parse(parsedObj);
    } else if (parsedObj.host.includes('tistory') || type === 'tistory') {
      templateObj = tistoryParser.parse(parsedObj);
    } else if (parsedObj.host.includes('daum') || type === 'daum') {
      templateObj = daumParser.parse(parsedObj);
    } else if (parsedObj.host.includes('medium') || type === 'medium') {
      templateObj = mediumParser.parse(parsedObj);
    } else if (parsedObj.host.includes('blogger') || parsedObj.host.includes('blogspot')
    || type === 'blogger') {
      templateObj = bloggerParser.parse(parsedObj);
    } else {
      templateObj = commonParser.parse(parsedObj, TagOptions);
    }

    return templateObj;
  },
};
