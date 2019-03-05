const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const ResultObject = require('../parser_option/resultObject');

function commonRemove(obj, tagName) {
  const $ = cheerio.load(obj);
  $(tagName).remove();
  return $.html();
}

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

      if (TagOptions.remove) {
        if (typeof TagOptions.remove.tagName !== 'Array') {
          throw new Error('remove tag not Array');
        }
        TagOptions.remove.tagName.forEach(tag => commonRemove(content, tag));
      }
    }

    if (!content) {
      throw new Error('cannot find Any Contents');
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
