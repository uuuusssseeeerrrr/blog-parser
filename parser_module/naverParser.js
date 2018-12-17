/* eslint no-use-before-define: ["error", { "functions": false }] */
const rpn = require('request-promise-native');
const cheerio = require('cheerio');

exports.parse = async (url) => {
  let result;
  const splitTarget = url.path.split('/');
  const targetURL = `https://blog.naver.com/PostView.nhn?blogId=${splitTarget[1]}&logNo=${splitTarget[2]}`;
  const html = await rpn.get(targetURL);
  const $ = await cheerio.load(html);
  if ($('.se_doc_header_start').length > 0) {
    result = parseSE3(html);
  } else {
    result = parseSE2(html);
  }
  return result;
};

function parseSE2(html) {
  const $ = cheerio.load(html);
  const title = $('.pcol1').html();
  const content = $('#postViewArea').html();
  return {
    title, content,
  };
}

function parseSE3(html) {
  const $ = cheerio.load(html);
  const title = $('h3.se_textarea').html();
  let content = "<link rel='stylesheet' href='https://ssl.pstatic.net/static.editor/static/viewer/common/se_viewer_blog_pc.css'/>";
  content += $('div.sect_dsc').html();
  return {
    title, content,
  };
}
