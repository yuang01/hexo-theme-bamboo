---
title: Hello World
date: 2020-09-10 14:06
comments: false
swiper: true

img: '/medias/4.png'
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).
<!-- more -->

## Quick Start
### Create a new post

``` bash
$ hexo new "My New Post"
```
![avatar](/img/54542.jpg)
![avatar](/img/520.jpg)
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
