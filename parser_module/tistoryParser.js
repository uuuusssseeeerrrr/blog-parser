/* eslint-disable prefer-destructuring */
const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const tistoryConstJson = require('../parser_constraint/tistoryConstArray');

function nextSibilingDelete(el, removeContentArray) {
  let $ = el;
  let html = el;
  let removeTarget;
  for (let i = 0; i < removeContentArray.length; i += 1) {
    if (typeof el === 'string') {
      $ = cheerio.load(el);
    }
    if ($(removeContentArray[i]).length > 0) {
      while ($(removeContentArray[i]).next().length > 0) {
        removeTarget = $(removeContentArray[i]).next().html();
        $(removeContentArray[i]).next().remove();
        html = html.replace(removeTarget, '');
      }
      removeTarget = $(removeContentArray[i]).remove();
      html = html.replace(removeTarget, '');
    }
  }
  return html;
}

async function parse(url) {
  const contentArrayList = tistoryConstJson.contentArray;
  const removeContentArray = tistoryConstJson.removeContentArray;
  let content;
  const html = await rpn.get(url);
  const $ = await cheerio.load(html);
  const title = $("meta[property='og:title']").attr('content');

  if (contentArrayList) {
    for (let i = 0; i < contentArrayList.length; i += 1) {
      content = $(contentArrayList[i]).html() || '';
      if (content) {
        break;
      }
    }
    content = await nextSibilingDelete(content, removeContentArray);
  }

  if (!content) {
    return new Error('tistory 컨텐츠가 없습니다. 본문 같이 customparse메소드를 사용해주세요');
  }

  return {
    title,
    content,
  };
}

exports.parse = (url) => {
  return parse(url.href);
};
