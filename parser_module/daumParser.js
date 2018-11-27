const rp = require('request-promise');
const cheerio = require('cheerio');

async function parse(url) {
  const outerFrameURL = await rp.get(url.href).then((html) => {
    const $ = cheerio.load(html);
    return `${url.protocol}//${url.host}${$('frame[name=BlogMain]').attr('src')}`;
  });

  const innerFrameURL = await rp.get(outerFrameURL).then((html) => {
    const $ = cheerio.load(html);
    return `${url.protocol}//${url.host}${$('#if_b_104').attr('src')}`;
  });

  const result = await rp.get(innerFrameURL).then((html) => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    const content = $('#contentDiv').html();
    return { title, content };
  });
  return result;
}

exports.parse = async (url) => {
  const result = await parse(url).then(returnValue => returnValue);
  return result;
};
