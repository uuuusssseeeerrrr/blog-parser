/* eslint no-use-before-define: ["error", { "functions": false }] */
const https = require('https');
const cheerio = require('cheerio');

exports.parse = (url) => {
  const splitTarget = url.path.split('/');
  const targetURL = `https://blog.naver.com/PostView.nhn?blogId=${splitTarget[1]}&logNo=${splitTarget[2]}`;
  let serverData;

  https.get(targetURL, (response) => {
    response.on('data', (chunk) => {
      serverData += chunk;
    });
    response.on('end', () => {
      if (serverData.includes('class="se_doc_header_start"')) {
        parseSE3(serverData);
      } else {
        parseSE2(serverData);
      }
    });
  }).end();
};

function parseSE2(dataHTML) {
  const $ = cheerio.load(dataHTML);
  const title = $('.pcol1').html();
  const content = $('#postViewArea').html();
  return {
    title, content,
  };
}

function parseSE3(dataHTML) {
  const $ = cheerio.load(dataHTML);
  const title = $('h3.se_textarea').html();
  let content = "<link rel='stylesheet' href='https://ssl.pstatic.net/static.editor/static/viewer/common/se_viewer_blog_pc.css'/>";
  content += $('div.sect_dsc').html();
  return {
    title, content,
  };
}
