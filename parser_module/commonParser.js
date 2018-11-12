const http = require('http');
const https = require('https');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

function commonParse(serverData, TagOptions){
  try {
    let title;
    let content;
    const dom = new JSDOM(serverData);
    if (TagOptions.title) {
      switch (TagOptions.title.type) {
        case 'tag':
          title = dom.window.document.getElementsByTagName(`${TagOptions.title.name}`).content;
          break;
        case 'id':
          title = dom.window.document.getElementById(`${TagOptions.title.name}`).content;
          break;
        case 'class':
          title = dom.window.document.getElementsByClassName(`${TagOptions.title.name}`).content;
          break;
        case 'name':
          title = dom.window.document.getElementsByName(`${TagOptions.title.name}`).content;
          break;
        default:
          title = dom.window.document.querySelector(`${TagOptions.title.name}`).content;
          break;
      }
    }

    if (TagOptions.content) {
      switch (TagOptions.content.type) {
        case 'tag':
          content = dom.window.document.getElementsByTagName(`${TagOptions.content.name}`);
          break;
        case 'id':
          content = dom.window.document.getElementById(`${TagOptions.content.name}`);
          break;
        case 'class':
          content = dom.window.document.getElementsByClassName(`${TagOptions.content.name}`);
          break;
        case 'name':
          content = dom.window.document.getElementsByName(`${TagOptions.content.name}`);
          break;
        default:
          content = dom.window.document.querySelector(`${TagOptions.content.name}`);
          break;
      }
    }

    if (!content) {
      return new Error('컨텐츠를 찾을 수 없습니다');
    }
    console.log(title);
    console.log(content);
    return {
      title: title.outerHTML,
      content: content.outerHTML,
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
