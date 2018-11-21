const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

function parse(serverData) {
  const $ = cheerio.load(serverData);
  console.log($);
}

function loadData(url) {
  
}

exports.parse = (url) => {
  // iframe 주소 뽑기
  let HTTPModule;
  let serverData;

  if (url.protocol.indexOf('https') > -1) {
    HTTPModule = https;
  } else {
    HTTPModule = http;
  }

  HTTPModule.get(url.href, (response) => {
    response.on('data', (chunk) => {
      serverData += chunk;
    });
    response.on('end', () => {
      console.log(serverData);// serverData가 안나감
    });
  }).end();

  let data = loadData(url);
  data = data.substring(data.indexOf('<frame src='), data.indexOf('</frame>'));
  data = data.substring(data.indexOf('"'), data.lastIndexOf('"'));
  parse(data);
};
