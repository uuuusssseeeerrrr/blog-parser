const rp = require('request-promise');
const cheerio = require('cheerio');

exports.parse = async (url) => {
  const outerFrameURL = await rp.get(url.href).then((html) => {
    const $ = cheerio.load(html);
    return `http://blog.daum.net/${$('frame[name=BlogMain]').attr('src')}`;
  }).catch((error) => { console.log(error); });

  const innerFrameURL = await rp.get(outerFrameURL).then((html) => {
    const $ = cheerio.load(html);
    return `http://blog.daum.net/${$('#cContentBody').find('iframe').attr('src')}`;
  }).catch((error) => { console.log(error); });

  const html = await rp.get(innerFrameURL);
  const $ = cheerio.load(html);
  return {
    title: $('title').text(),
    content: $('#contentDiv').html(),
  };
};
