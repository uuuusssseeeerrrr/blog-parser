const rp = require('request-promise-native');
const cheerio = require('cheerio');

async function contentLoad(url) {
  try {
    const htmlData = await rp.get(url);
    return htmlData;
  } catch (err) {
    throw err;
  }
}

async function blogParse(url) {
  try {
    let html = await contentLoad(url);
    let $ = await cheerio.load(html);
    let src = $('frame[name=BlogMain]').attr('src');
    let nextUrl = `http://blog.daum.net/${src}`;
    html = await contentLoad(nextUrl);
    $ = await cheerio.load(html);
    src = $('#cContentBody').find('iframe').attr('src');
    nextUrl = `http://blog.daum.net/${src}`;
    html = await contentLoad(nextUrl);
    $ = await cheerio.load(html);
    return {
      title: $('title').text(),
      content: $('#contentDiv').html(),
    };
  } catch (err) {
    return err;
  }
}

exports.parse = (url) => { blogParse(url.href); };
