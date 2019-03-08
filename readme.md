# BLOGPARSER MODULE

## Introduction

This Module is global Blog Parser Module.
if you are offer BLOG URL, Module will parse BLOG and serve `{title, Content}` Object.

This Parser support `NAVER, TISTORY, DAUM, MEDIUM, BLOGGER, WORDPRESS` BLOG and support JS Promise Pattern only.(25/02/2019)

## HOW TO USE(except common parser)

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

## HOW TO USE(common parser)

`commonParser` is made for sites that parser is not working.
`parse` method is same the other parser but `options` parameter is need to working.
`options` parameter have `title, contents, remove` properties and all property have attribute–value pairs named `value, type`.

example)
    ```
    const tagoption = {
      title: {
        value: tagName,
        type: tagtype,
      },
      content: {
        value: tagName,
        type: tagtype,
      },
      remove: [{
        value: tagName,
        type: tagtype,
      }],
    };
    ```

The rules for this parameter is:
1. `value` property is what you want parse ID or className
2. `type` property is unique HTML attribute name(id, class, custom)
3. `remove` property is what you want remove attribute

## Finale

EvenyThing Ask & Bug Report & Support Module : <a href="https://github.com/uuuusssseeeerrrr/blog-parser/issues">[GITHUB]</a>

Thank You for using Module!
