const rp = require('request-promise-native');
const cheerio = require('cheerio');
const ResultObject = require('./resultObject');

exports.parse = url => rp.get(url.href).then((result, reject) => {
  if (reject) {
    throw reject;
  }
  const $ = cheerio.load(result);
  const title = $('meta[property="og:title"]')[0].attribs.content;
  const content = $('.post-body').html();
  return new ResultObject(title, content);
});
