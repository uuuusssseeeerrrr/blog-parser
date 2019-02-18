const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const ResultObject = require('../parser_option/resultObject');

exports.parse = async (url) => {
  try {
    const htmlData = await rpn.get(url.href);
    const $ = await cheerio.load(htmlData);
    const resobj = new ResultObject($('h1.entry-title').text(), $('section.content').html());
    return resobj;
  } catch (ex) {
    throw ex;
  }
};
