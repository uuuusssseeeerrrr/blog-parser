const rp = require('request-promise-native');
const cheerio = require('cheerio');

function contentLoad(url) {
  return rp.get(url)
    .then(value => value)
    .catch(error => error);
}

exports.parse = async (url) => {
  try {
    let html = await contentLoad(url.href);
    let $ = await cheerio.load(html);
    let nextUrl = `http://blog.daum.net/${$('frame[name=BlogMain]').attr('src')}`;
    html = await contentLoad(nextUrl);
    $ = await cheerio.load(html);
    nextUrl = `http://blog.daum.net/${$('#cContentBody').find('iframe').attr('src')}`;
    html = await contentLoad(nextUrl);
    $ = await cheerio.load(html);
    return {
      title: $('title').text(),
      content: $('#contentDiv').html(),
    };
  } catch (err) {
    return err;
  }
};
