const rp = require('request-promise');
const cheerio = require('cheerio');

async function parse(url) {
  const data1 = await rp.get(url.href).then((html) => {
    const $ = cheerio.load(html);
    return `${url.protocol}//${url.host}${$('frame[name=BlogMain]').attr('src')}`;
  });
  await rp.get(data1).then((html) => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    const content = $('#contentDiv').html();
    console.log(title);
    console.log(content);
    return { title, content };
  });
}

exports.parse = url => parse(url);
