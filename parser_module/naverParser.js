/* eslint no-use-before-define: ["error", { "functions": false }] */
const rpn = require('request-promise-native');
const cheerio = require('cheerio');
const ResultObject = require('./resultObject');

exports.parse = async (url) => {
  let result;
  const splitTarget = url.path.split('/');
  const targetURL = `https://blog.naver.com/PostView.nhn?blogId=${splitTarget[1]}&logNo=${splitTarget[2]}`;
  const html = await rpn.get(targetURL);
  const $ = await cheerio.load(html);

  // eslint-disable-next-line default-case
  switch ($('#post_1').attr('data-post-editor-version')) {
    case '2':
      result = parseV2(html);
      break;
    case '3':
      result = parseV3(html);
      break;
    case '4':
      result = parseV4(html);
      break;
  }

  return result;
};

function parseV2(html) {
  const $ = cheerio.load(html);
  const title = $('.pcol1').html();
  const content = $('#postViewArea').html();
  return new ResultObject(title, content);
}

function parseV3(html) {
  const $ = cheerio.load(html);
  const title = $('h3.se_textarea').html();
  let content = "<link rel='stylesheet' href='https://ssl.pstatic.net/static.editor/static/viewer/common/se_viewer_blog_pc.css'/>";
  content += "<link rel='stylesheet' href='https://editor-static.pstatic.net//v/blog/css/se.viewer.desktop.css'/>";
  content += $('div.sect_dsc').html();
  return new ResultObject(title, content);
}

function parseV4(html) {
  const $ = cheerio.load(html);
  const title = $('div.pcol1 span').text();
  let content = "<link rel='stylesheet' href='https://ssl.pstatic.net/static.editor/static/viewer/common/se_viewer_blog_pc.css'/>";
  content += "<link rel='stylesheet' href='https://editor-static.pstatic.net//v/blog/css/se.viewer.desktop.css'/>";
  content += $('div.se-main-container').html();
  return new ResultObject(title, content);
}
