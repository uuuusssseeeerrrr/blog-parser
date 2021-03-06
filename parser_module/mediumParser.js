const cheerio = require('cheerio');
const rpn = require('request-promise-native');
const ResultObject = require('../parser_option/resultObject');

exports.parse = (url) => {
  const options = {
    uri: url.href,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return rpn.get(options).then((html) => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    const content = $('.sectionLayout--insetColumn').text();
    return new ResultObject(title, content);
  });
};
