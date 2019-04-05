const url = require('url');
const naverParser = require('./parser_module/naverParser');
const tistoryParser = require('./parser_module/tistoryParser');
const daumParser = require('./parser_module/daumParser');
const commonParser = require('./parser_module/commonParser');
const mediumParser = require('./parser_module/mediumParser');
const bloggerParser = require('./parser_module/bloggerParser');
const wordpressParser = require('./parser_module/wordpressParser');

const BLOGTYPE = {
  TYPE_CUSTOM : 0,
  TYPE_NAVER : 1,
  TYPE_TISTORY : 2,
  TYPE_DAUM : 3,
  TYPE_MEDIUM : 4,
  TYPE_BLOGGER : 5,
  TYPE_WORDPRESS : 6,
}

module.exports = {
  BLOGTYPE,

  parse: (_url, type, TagOptions) => {
    let templateObj;
    const parsedObj = url.parse(_url);

    if (parsedObj.host.includes('naver') || type === BLOGTYPE.TYPE_NAVER) {
      templateObj = naverParser.parse(parsedObj);
    } else if (parsedObj.host.includes('tistory') || type === BLOGTYPE.TYPE_TISTORY) {
      templateObj = tistoryParser.parse(parsedObj);
    } else if (parsedObj.host.includes('daum') || type === BLOGTYPE.TYPE_DAUM) {
      templateObj = daumParser.parse(parsedObj);
    } else if (parsedObj.host.includes('medium') || type === BLOGTYPE.TYPE_MEDIUM) {
      templateObj = mediumParser.parse(parsedObj);
    } else if (parsedObj.host.includes('blogger') || parsedObj.host.includes('blogspot')
    || type === BLOGTYPE.TYPE_BLOGGER) {
      templateObj = bloggerParser.parse(parsedObj);
    } else if (type === BLOGTYPE.TYPE_WORDPRESS) {
      templateObj = wordpressParser.parse(parsedObj, TagOptions);
    } else if (!type || type === BLOGTYPE.TYPE_CUSTOM) {
      templateObj = commonParser.parse(parsedObj, TagOptions);
    }
    return templateObj;
  },
};
