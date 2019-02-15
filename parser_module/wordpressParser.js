const rp = require('request-promise-native');
const cheerio = require('cheerio');
const ResultObject = require('./resultObject');

exports.parse = async (url) => {
  try {
    const htmlData = await rp.get(url.href);
    const $ = await cheerio.load(htmlData);
    return new ResultObject($('h1.entry-title').text(), $('section.content').html());
  } catch (ex) {
    throw ex;
  }
};
