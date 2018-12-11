// const cheerio = require('cheerio');
// const http = require('http');

// exports.parse = (url) => {
//   let serverData;
//   let headers = {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
//     'Content-Type': 'application/x-www-form-urlencoded',
//   };
//   var options = {
//     host: 'stackoverflow.com',
//     port: 80,
//     path: '/'
//   };
//   const $ = http.get(url.href, (response) => response.on('data', (chunk) => {
//     serverData += chunk;
//   }));
//   response.on('end', () => {
//     const $ = cheerio.load(serverData);
//     return {
//       title: $('title').text(),
//       content: $('#contentDiv').html(),
//     };
//   });
// }).end();
// {
//     url: url.href,
    
//     transform: body => cheerio.load(body),
//     method: 'GET',
//   });

//   return {
//     title: $('title').text(),
//     content: $('.sectionLayout--insetColumn').text(),
//   };
// };
