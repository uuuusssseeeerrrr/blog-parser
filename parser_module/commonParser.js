const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

function commonParse(serverData, TagOptions) {
  try {
    let title;
    let content;
    const $ = cheerio.load(serverData);

    if (TagOptions.title) {
      switch (TagOptions.title.type) {
        case 'tag':
          title = `${TagOptions.title.name}`;
          break;
        case 'id':
          title = `#${TagOptions.title.name}`;
          break;
        case 'class':
          title = `.${TagOptions.title.name}`;
          break;
        case 'name':
          title = `${TagOptions.title.tagName}[name=${TagOptions.title.name}]`;
          break;
        default:
          title = `${TagOptions.title.name}`;
          break;
      }
      title = $(`${title}`).text() || $(`${title}`).val();
    }

    if (TagOptions.content) {
      switch (TagOptions.content.type) {
        case 'tag':
          content = `${TagOptions.content.name}`;
          break;
        case 'id':
          content = `#${TagOptions.content.name}`;
          break;
        case 'class':
          content = `.${TagOptions.content.name}`;
          break;
        case 'name':
          content = `${TagOptions.content.tagName}[name=${TagOptions.content.name}]`;
          break;
        default:
          content = `${TagOptions.content.name}`;
          break;
      }
      content = $(`${title}`).html();
    }

    if (!content) {
      return new Error('컨텐츠를 찾을 수 없습니다');
    }
    console.log(title);
    console.log(content);
    return {
      title,
      content,
    };
  } catch (ex) {
    console.log(ex);
    return ex;
  }
}

exports.parse = (url, TagOptions) => {
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
      commonParse(serverData, TagOptions);
    });
  }).end();
};
