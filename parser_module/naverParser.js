/* eslint no-use-before-define: ["error", { "functions": false }] */
const rpn = require('request-promise-native');
const cheerio = require('cheerio');

exports.parse = (url) => {
  const splitTarget = url.path.split('/');
  const targetURL = `https://blog.naver.com/PostView.nhn?blogId=${splitTarget[1]}&logNo=${splitTarget[2]}`;

  rpn.get(targetURL).then((html) => {
    const $ = cheerio.load(html);
    if ($('.se_doc_header_start').length > 0) {
      parseSE3(html);
    } else {
      parseSE2(html);
    }
  });
};

function parseSE2(html) {
  const $ = cheerio.load(html);
  const title = $('.pcol1').html();
  const content = $('#postViewArea').html();
  const result = {
    title, content,
  };
  return new Promise((resolve, reject) => {
    resolve(result);
  });
}

function parseSE3(html) {
  const $ = cheerio.load(html);
  const title = $('h3.se_textarea').html();
  let content = "<link rel='stylesheet' href='https://ssl.pstatic.net/static.editor/static/viewer/common/se_viewer_blog_pc.css'/>";
  content += $('div.sect_dsc').html();
  const result = {
    title, content,
  };
  return new Promise((resolve, reject) => {
    resolve(result);
  });
}
