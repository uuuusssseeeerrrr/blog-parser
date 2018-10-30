var naverparser = require('./naverparser');
var tistoryparser = require('./tistoryparser');
var url = require('url');

module.exports = {
    parse: (_url) => {
        let parsedObj = url.parse(_url);
        let templateObj = new Object();
        switch (parsedObj.host) {
            case "blog.naver.com":
            templateObj = naverparser.parse(parsedObj);
                break;
            case "tistory.com":
            templateObj = tistoryparser.parse(parsedObj);
                break;
        }
        return templateObj;
    }
};