/* eslint-disable prefer-destructuring */
const http = require('http');
const https = require('https');
const cheerio = require('cheerio');
const tistoryConstJson = require('../parser_constraint/tistoryConstArray');

function nextSibilingDelete(el, removeContentArray) {
  for (let i = 0; i < removeContentArray.length; i += 1) {
    if (el.querySelector(removeContentArray[i]) != null) {
      while (el.querySelector(removeContentArray[i]).nextSibling) {
        el.querySelector(removeContentArray[i]).nextSibling.remove();
      }
      el.querySelector(removeContentArray[i]).remove();
    }
  }
  return el;
}

function parse(serverData) {
  const contentArrayList = tistoryConstJson.contentArray;
  const removeContentArray = tistoryConstJson.removeContentArray;
  let content;
  const $ = cheerio.load(serverData);
  const title = $("meta[property='og:title']").attr('content');

  if (contentArrayList) {
    for (let i = 0; i < contentArrayList.length; i += 1) {
      content = $(contentArrayList[i]).html() || '';
      if (content) {
        break;
      }
    }
    content = nextSibilingDelete(content, removeContentArray);
  }

  if (!content) {
    return new Error('tistory 컨텐츠가 없습니다. 본문 같이 customparse메소드를 사용해주세요');
  }
  console.log(title);
  console.log(content);
  return {
    title,
    content,
  };
}

exports.parse = (url) => {
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
      parse(serverData);
    });
  }).end();
};
