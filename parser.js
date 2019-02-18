const url = require('url');
const naverParser = require('./parser_module/naverParser');
const tistoryParser = require('./parser_module/tistoryParser');
const daumParser = require('./parser_module/daumParser');
const commonParser = require('./parser_module/commonParser');
const mediumParser = require('./parser_module/mediumParser');
const bloggerParser = require('./parser_module/bloggerParser');
const wordpressParser = require('./parser_module/wordpressParser');

const TYPE_CUSTOM = 0;
const TYPE_NAVER = 1;
const TYPE_TISTORY = 2;
const TYPE_DAUM = 3;
const TYPE_MEDIUM = 4;
const TYPE_BLOGGER = 5;
const TYPE_WORDPRESS = 6;

module.exports = {
  TYPE_CUSTOM,
  TYPE_NAVER,
  TYPE_TISTORY,
  TYPE_DAUM,
  TYPE_MEDIUM,
  TYPE_BLOGGER,
  TYPE_WORDPRESS,
  parse: (_url, type, TagOptions) => {
    let templateObj;
    const parsedObj = url.parse(_url);

    if (parsedObj.host.includes('naver') || type === TYPE_NAVER) {
      templateObj = naverParser.parse(parsedObj);
    } else if (parsedObj.host.includes('tistory') || type === TYPE_TISTORY) {
      templateObj = tistoryParser.parse(parsedObj);
    } else if (parsedObj.host.includes('daum') || type === TYPE_DAUM) {
      templateObj = daumParser.parse(parsedObj);
    } else if (parsedObj.host.includes('medium') || type === TYPE_MEDIUM) {
      templateObj = mediumParser.parse(parsedObj);
    } else if (parsedObj.host.includes('blogger') || parsedObj.host.includes('blogspot')
    || type === TYPE_BLOGGER) {
      templateObj = bloggerParser.parse(parsedObj);
    } else if (type === TYPE_WORDPRESS) {
      templateObj = wordpressParser.parse(parsedObj, TagOptions);
    } else if (!type || type === TYPE_CUSTOM) {
      templateObj = commonParser.parse(parsedObj, TagOptions);
    }
    return templateObj;
  },
};
