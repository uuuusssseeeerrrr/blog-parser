const reqpromise = require('request-promise-native');
const jsdom = require('jsdom');
const fs = require('fs');

const { JSDOM } = jsdom;

exports.parse = (url) => {
  reqpromise.get(url.href).then((res) => {
    let classList;
    let content;
    const dom = new JSDOM(res);
    const title = dom.window.document.querySelector("meta[property='og:title']").content;

    fs.readFile('tistoryConstArray.json', (err, data) => {
      classList = JSON.parse(data).contentArray;
    });
    if (classList) {
      for (let i = 0; i < classList.length; i += 1) {
        content = dom.document.querySelector(classList[i]) || '';
        if (content) {
          break;
        }
      }
    }
    if (!content) {
      return new Error('tistory 컨텐츠가 없습니다. 본문메서드와 같이 customparse메소드를 사용해주세요');
    }

    return {
      title: title.outerHTML,
      content: content.outerHTML,
    };
  });
};

function nextSibilingDelete(el){
  while(a.querySelector(".tt_adsense_bottom").nextSibling){
    
  }
}