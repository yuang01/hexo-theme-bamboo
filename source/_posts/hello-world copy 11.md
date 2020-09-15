---
title: 这是一个测试页面哦
date: 2018-09-28 13:34:00
author: blinkfox
categories: 前端
tags: [Hexo, hexo-theme-Bamboo]
swiper: false
swiperImg: 'https://ssyerv1.oss-cn-hangzhou.aliyuncs.com/picture/663afbe7197941039f65afd048223aff.jpg!sswm'
img: '/medias/8.png'
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).
<!-- more -->

## Quick Start
### Create a new post

``` bash
$ hexo new "My New Post"
```
More info: [Writing](https://hexo.io/docs/writing.html)

### Run server
``` bash
npm install hexo-generator-search --save
```

``` js
search:
  path: search.xml
  field: post
```
``` json
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
   "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
}
```
``` js
// babel.config.js
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ]
}
```
>这是一段文字哦
test
``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)
