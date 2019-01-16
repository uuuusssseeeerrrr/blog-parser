const rp = require('request-promise-native');
const cheerio = require('cheerio');

exports.parse = (url) => {
  rp.get(url.href).then((result, reject) => {
    if (reject) throw reject;
    const $ = cheerio.load(result);
    console.log($);
  });
};
