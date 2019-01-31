const rp = require('request-promise-native');
const cheerio = require('cheerio');

exports.parse = async (url) => {
  try {
    const htmlData = await rp.get(url.href);
    const $ = await cheerio.load(htmlData);
    return {
      title: $('h1.entry-title').text(),
      content: $('section.content').html(),
    };
  } catch (ex) {
    throw ex;
  }
};
