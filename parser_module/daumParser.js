const http = require('http');
const cheerio = require('cheerio');

function resultInit(url) {
  let serverData;
  http.get(url, (response) => {
    response.on('data', (chunk) => {
      serverData += chunk;
    });
    response.on('end', () => {
      const $ = cheerio.load(serverData);
      return {
        title: $('title').text(),
        content: $('#contentDiv').html(),
      };
    });
  }).end();
}

function secondUrlInit(url) {
  let serverData;
  http.get(url, (response) => {
    response.on('data', (chunk) => {
      serverData += chunk;
    });
    response.on('end', () => {
      const $ = cheerio.load(serverData);
      const nextUrl = `http://blog.daum.net/${$('#cContentBody').find('iframe').attr('src')}`;
      resultInit(nextUrl);
    });
  }).end();
}

function firstUrlInit(url) {
  let serverData;
  http.get(url, (response) => {
    response.on('data', (chunk) => {
      serverData += chunk;
    });
    response.on('end', () => {
      const $ = cheerio.load(serverData);
      const nextUrl = `http://blog.daum.net/${$('frame[name=BlogMain]').attr('src')}`;
      secondUrlInit(nextUrl);
    });
  }).end();
}

exports.parse = url => firstUrlInit(url.href);
