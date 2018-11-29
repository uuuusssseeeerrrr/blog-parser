const https = require('https');
const cheerio = require('cheerio');

function parse(html) {
  const $ = cheerio(html);
  
}

exports.parse = (url) => {
  let serverData;

  https.get(url.href, (response) => {
    response.on('data', (chunk) => {
      serverData += chunk;
    });
    response.on('end', () => {
      parse(serverData);
    });
  }).end();
};
