/* eslint-disable prefer-destructuring */
const reqpromise = require('request-promise-native');
const jsdom = require('jsdom');
const tistoryConstJson = require('../parser_constraint/tistoryConstArray');

const { JSDOM } = jsdom;

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

exports.parse = (url) => {
  reqpromise.get(url.href).then((res) => {
    const contentArrayList = tistoryConstJson.contentArray;
    const removeContentArray = tistoryConstJson.removeContentArray;
    let content;
    const dom = new JSDOM(res);
    const title = dom.window.document.querySelector("meta[property='og:title']").content;

    if (contentArrayList) {
      for (let i = 0; i < contentArrayList.length; i += 1) {
        content = dom.window.document.querySelector(contentArrayList[i]) || '';
        if (content) {
          break;
        }
      }
      content = nextSibilingDelete(content, removeContentArray);
    }

    if (!content) {
      return new Error('tistory 컨텐츠가 없습니다. 본문 같이 customparse메소드를 사용해주세요');
    }
    console.log(title.outerHTML);
    console.log(content.outerHTML);
    return {
      title: title.outerHTML,
      content: content.outerHTML,
    };
  });
};
