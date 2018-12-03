const rp = require('request-promise-native');
const cheerio = require('cheerio');

function firstUrlInit(html) {
  const $ = cheerio.load(html);
  return `http://blog.daum.net/${$('frame[name=BlogMain]').attr('src')}`;
}

function secondUrlInit(html) {
  const $ = cheerio.load(html);
  return `http://blog.daum.net/${$('#cContentBody').find('iframe').attr('src')}`;
}

function resultInit(html) {
  const $ = cheerio.load(html);
  return {
    title: $('title').text(),
    content: $('#contentDiv').html(),
  };
}

async function getData(url) {
  let targetUrl = firstUrlInit(await rp.get(url.href))
  console.log(targetUrl);
  targetUrl = secondUrlInit(await rp.get(targetUrl));
  console.log(targetUrl);
  const result = resultInit(await rp.get(targetUrl));
  console.log(result);
  return result;
}

exports.parse = (url) => {
  getData(url).then(html => html);
};
