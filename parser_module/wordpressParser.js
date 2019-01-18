const rp = require('request-promise-native');
const cheerio = require('cheerio');

exports.parse = (url) => {
  rp.get(url.href).then((result, reject) => {
    if (reject) throw reject;
    const $ = cheerio.load(result);
    return {
      title: $('h1.entry-title').text(),
      content: $('section.content').html(),
    };
  });
};
