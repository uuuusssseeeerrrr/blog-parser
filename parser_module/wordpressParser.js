const rp = require('request-promise-native');
const cheerio = require('cheerio');

exports.parse = (url) => {
  rp.get(url.href).then((result, reject) => {
    if (reject) throw reject;
    var $ = cheerio.load(result);
    console.log($);
  });
};
