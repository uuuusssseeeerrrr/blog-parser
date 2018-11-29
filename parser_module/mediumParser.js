const cheerio = require('cheerio');
const rp = require('request-promise');

exports.parse = async (url) => {
  const $ = await rp({
    url: url.href,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transform: body => cheerio.load(body),
    method: 'GET',
  });

  return result;
};
