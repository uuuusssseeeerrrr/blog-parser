# BLOGPARSER MODULE

## Introduction

This Module is global Blog Parser Module.
if you are offer BLOG URL, Module will parse BLOG and serve `{title, Content}` Object.

This Parser support `NAVER, TISTORY, DAUM, MEDIUM, BLOGGER, WORDPRESS` BLOG and support JS Promise Pattern only.

## HOW TO USE

> ModuleName.parse(URL, blogType, Options)

function parameters it is:
1. `URL` parameter must need correct URL.
2. `blogType` parameter is Optional. but if URL hasn't blog brand name(ex. wordpress), you need serve suitable blog type. and also Most IDE (at least VSCODE) support BLOGTYPE variable.
3. `Options` parameter is use `CustomParse` Function Only.

for Example)

```
const parser = require('./parser'); //Module Import

parser.parse(URL, parser.BLOGTYPE).then(
    //TODO
)

OR

let a = parser.parse(URL, parser.BLOGTYPE);
a.then(
    //TODO
)
```

## Finale

EvenyThing Ask & Bug Report & Support Module : <a href="https://github.com/uuuusssseeeerrrr/blog-parser/issues">[GITHUB]</a>

Thank You for using Module!