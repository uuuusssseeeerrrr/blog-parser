const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const ResultObject = require('../parser_option/resultObject');

function commonParse(serverData, TagOptions) {
  try {
    let title;
    let content;
    const $ = cheerio.load(serverData);

    if (TagOptions.title) {
      switch (TagOptions.title.type) {
        case 'custom':
          title = `${TagOptions.title.value}`;
          break;
        case 'id':
          title = `#${TagOptions.title.value}`;
          break;
        case 'class':
          title = `.${TagOptions.title.value}`;
          break;
        case 'name':
          title = `${TagOptions.title.tagName}[name=${TagOptions.title.value}]`;
          break;
        default:
          title = '';
          break;
      }
      title = $(`${title}`).text() || $(`${title}`).val();
    }

    if (TagOptions.content) {
      switch (TagOptions.content.type) {
        case 'custom':
          content = `${TagOptions.content.value}`;
          break;
        case 'id':
          content = `#${TagOptions.content.value}`;
          break;
        case 'class':
          content = `.${TagOptions.content.value}`;
          break;
        case 'name':
          content = `${TagOptions.content.tagName}[name=${TagOptions.content.value}]`;
          break;
        default:
          content = '';
          break;
      }
      content = $(`${content}`).html();
    }

    if (!content) {
      throw new Error('컨텐츠를 찾을 수 없습니다');
    }
    return new ResultObject(title, content);
  } catch (ex) {
    throw new Error(ex);
  }
}

exports.parse = async (url, TagOptions) => {
  try {
    const serverData = await rpn.get(url.href);
    await commonParse(serverData, TagOptions);
  } catch (ex) {
    console.log(ex);
  }
};
