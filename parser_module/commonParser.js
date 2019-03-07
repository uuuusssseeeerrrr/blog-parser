const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const ResultObject = require('../parser_option/resultObject');

function commonRemove(obj, tagObj) {
  const $ = cheerio.load(obj);
  const {value, type} = tagObj;
  switch (type) {
    case 'custom':
      $(`${value}`).remove();
      break;
    case 'id':
      $(`#${value}`).remove();
      break;
    case 'class':
      $(`.${value}`).remove();
      break;
    default:
      break;
  }
  return $.html();
}

function commonParse(serverData, tagOptions) {
  try {
    let title;
    let content;
    const $ = cheerio.load(serverData);
    if (tagOptions.title) {
      switch (tagOptions.title.type) {
        case 'custom':
          title = `${tagOptions.title.value}`;
          break;
        case 'id':
          title = `#${tagOptions.title.value}`;
          break;
        case 'class':
          title = `.${tagOptions.title.value}`;
          break;
        default:
          title = '';
          break;
      }
      title = $(`${title}`).text() || $(`${title}`).val();
    }

    if (tagOptions.content) {
      switch (tagOptions.content.type) {
        case 'custom':
          content = `${tagOptions.content.value}`;
          break;
        case 'id':
          content = `#${tagOptions.content.value}`;
          break;
        case 'class':
          content = `.${tagOptions.content.value}`;
          break;
        default:
          content = '';
          break;
      }
      content = $(`${content}`).html();

      if (tagOptions.remove) {
        const obj = tagOptions.remove;
        if (obj.constructor === Object) {
          content = commonRemove(content, { value: tagOptions.remove.value, type: tagOptions.remove.type });
        } else if (obj.constructor === Array) {
          tagOptions.remove.forEach((tag) => {
            content = commonRemove(content, tag);
          });
        }
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

exports.parse = async (url, tagOptions) => {
  try {
    //check tagOpt is JSON
    if(typeof tagOptions !== 'Object' && typeof tagOptions !== 'object'){
      return false;
    }

    //execute
    const serverData = await rpn.get(url.href);
    await commonParse(serverData, tagOptions);
  } catch (ex) {
    console.log(ex);
  }
};
