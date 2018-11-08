/* eslint no-use-before-define: ["error", { "functions": false }] */
const reqpromise = require('request-promise-native');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
exports.parse = (url) => {
  const splitTarget = url.path.split('/');
  const targetURL = `https://blog.naver.com/PostView.nhn?
  blogId=${splitTarget[1]}&logNo=${splitTarget[2]}`;
  reqpromise.get(targetURL)
    .then((res) => {
      if (res.includes('class="se_doc_header_start"')) {
        parseSE3(res);
      } else {
        parseSE2(res);
      }
    })
    .catch((err) => {
      throw err;
    });
};

function parseSE2(dataHTML) {
  const dom = new JSDOM(dataHTML);
  const title = dom.window.document.getElementsByClassName('pcol1');
  const postArea = dom.window.document.getElementById('postViewArea');
  return {
    title: title.outerHTML,
    content: postArea.outerHTML,
  };
}

function parseSE3(dataHTML) {
  const dom = new JSDOM(dataHTML);
  const title = dom.window.document.querySelector('h3.se_textarea');
  let postArea = "<link rel='stylesheet' href='https://ssl.pstatic.net/static.editor/static/viewer/common/se_viewer_blog_pc.css'/>";
  postArea += dom.window.document.querySelector('div.sect_dsc').outerHTML;
  return {
    title: title.outerHTML,
    content: postArea.outerHTML,
  };
}
