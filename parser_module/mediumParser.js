const cheerio = require('cheerio');
const rp = require('request-promise-native');

exports.parse = (url) => {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  rp.get({ url; url.href, headers }, (html) => {
    const $ = cheerio.load(html);

    return {
      title: $('title').text(),
      content: $('.sectionLayout--insetColumn').text(),
    };
  });
};
