const request = require('request');
const cheerio = require('cheerio');

// function parse(serverData) {
//   return cheerio.load(serverData);
// }

exports.parse = (url) => {
  request(url, (error, response, html) => {
    if (error) { throw error; }
    const $ = cheerio.load(html);
    url = $('frame[name=BlogMain]').attr('src');
    console.log(url);
  });
};
