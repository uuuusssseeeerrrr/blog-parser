const cheerio = require('cheerio');
const rp = require('request-promise');

async function getData(url) {
  const result = await rp({
    url: url.href,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transform: body => cheerio.load(body),
    method: 'GET',
  }).then(($) => {
    const title = $('title').text();
    const content = $('.sectionLayout--insetColumn').text();
    return { title, content };
  }).error((reason) => {
    console.log(reason);
  });
  return result;
}

exports.parse = async (url) => {
  const returnValue = await getData(url).then(val => val);
  console.log(returnValue);
  return returnValue;
};
