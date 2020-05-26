---
title: Hello World
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

``` javascript
search:
  path: search.xml
  field: post
```
>这是一段文字哦
test
``` html
<ayu-form :model="baseForm" labelWidth="80px">
  <ayu-form-item label="用户名">
    <ayu-input v-model="baseForm.name"/>
  </ayu-form-item>
  <ayu-form-item label="水果">
    <ayu-select v-model="baseForm.fruits" placeholder="请选择">
      <ayu-option 
        v-for="item in options" 
        :key="item.value" 
        :label="item.label" 
        :value="item.value">
        {{ item.label }}
      </ayu-option>
    </ayu-select>
  </ayu-form-item>
  <ayu-form-item>
    <ayu-button>取消</ayu-button>
    <ayu-button type="primary" @click="onSubmit">确定</ayu-button>
  </ayu-form-item>
</ayu-form>

<script>
  export default {
    data() {
      return {
        baseForm: {
          name: '',
          fruits: ''
        },
        options: [
          {
            label: '苹果',
            value: 'apple'
          },
          {
            label: '香蕉',
            value: 'Banana'
          },
        ]
      }
    },
    methods:{
      onSubmit() {
        console.log('提交');
      }
    }
  }
</script>
```
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
