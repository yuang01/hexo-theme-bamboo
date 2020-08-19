---
title: vue.js实现左侧导航栏和tab切换页面效果
date: 2019-01-20 21:11
categories: "vue.js"
tags: 'vue.js'
swiper: true
swiperImg: 'https://ssyerv1.oss-cn-hangzhou.aliyuncs.com/picture/c080ff4434354e35af9dab0a3ee1b9f7.jpg!sswm'
img: '/medias/10.jpg'
---
基于<a href="https://getbootstrapadmin.com/remark/base/index.html">remark UI</a>的样式，使用vue.js编写了左侧导航栏（侧边栏）和tab切换页面功能。基于<a href="https://getbootstrapadmin.com/remark/base/index.html">remark UI</a>的样式敖德萨多撒多撒多撒多敖德萨多撒多大大撒多所大声道撒多大大的撒旦撒旦大萨达所所多

<!-- more -->
# 效果总览
![效果总览](/images/remark.gif)
# 左侧导航栏
> 代码地址(侧边栏)
https://github.com/yuang01/remark-ui-vue/blob/master/src/views/Layout/Menubar/SidebarItem.vue

# tab页面切换
支持滚轮滚动来选择tab，支持右键点击选择关闭、关闭其他、关闭所有
> 代码地址
https://github.com/yuang01/remark-ui-vue/blob/master/src/views/Layout/Tabbar/Tabbar.vue

# 路由定义
我是通过路由生成的左侧导航栏，所以首先定义路由至关重要，需要遵循一些规则。我的配置是这样的：<a href="https://github.com/yuang01/remark-ui-vue/blob/master/src/router/index.js">router</a>。
这样定义是不会出现在侧边栏上的
``` javascript
{
  path: '/login',
  component: Login,
},
```
这样定义才会出现在侧边栏上
``` javascript
{
  path: '/basicUi',
  component: Layout,
  redirect: '/basicUi/index', // 重定向地址
  // meta: { icon: 'inbox', title: 'Basic UI' },
  children: [
    {
      path: 'index',
      component: basicUi,
      name: 'basicUi',
      meta: { icon: 'inbox', title: 'Basic UI' }, // 出现在左侧导航栏的图标和标题
    },
  ],
},
```
像上面这样children的个数只有一个的时候，可以将meta写在父级上，如注释部分
当你一个路由下面的 children 声明的路由大于>1 个时，自动会变成嵌套的模式。如果子路由正好等于一个就会默认将子路由作为根路由显示在侧边栏中。
这样定义才会有submenu。
``` javascript
{
  path: '/basicUi',
  component: Layout,
  redirect: '/basicUi/index',
  meta: { icon: 'inbox', title: 'Basic UI' },
  children: [
    { path: 'index', component: basicUi, name: 'basicUi', meta: { title: 'BasicUI-Index' }, },
    { path: 'two', component: basicUi, name: 'basicUi', meta: { title: 'BasicUI-two' }, },
  ],
},
```
## 配置项
#### hidden
当设置 true 的时候该路由不会在侧边栏出现
#### category
侧边栏的类别，如果侧边栏进行分类的话可以使用category，定义在哪个路由中，便显示在哪个路由的上方。如这样定义
``` javascript
{
  path: '',
  component: Layout,
  redirect: '/dashboard',
  category: '业务',
  children: [
    { path: 'dashboard', component: Dashboard, name: 'Dashboard', meta: { icon: 'dashboard', title: '首页' }, },
  ],
},
```
category是这样显示的
![category](/images/remark01.png)
#### meta
当只显示根目录的时候（children的length为1），可以在children之外和在children里面写
``` javascript
meta: { title: '标题', icon: 'icon' }
```
如果有多个子路由，那么子路由的meta不需要定义icon，因为子路由不展示icon，如
``` javascript
meta: { title: '标题' }
```
#### extends
有时候会跳转到详情页，那么我们可以将详情页的meta中的extends设为该路由的path，并且在详情页加上hidden: true属性。例如从menu1-2-2页面跳转到menu1-2-2的详情页
``` javascript
{
  path: 'menu1-2-2',
  component: () => import('@/views/nested2/menu1/menu1-2/menu1-2-2'),
  name: 'menu1-2-2',
  meta: { title: 'Amenu1-2-2' },
},
{
  path: 'edit',
  component: () => import('@/views/nested2/menu1/menu1-2/edit'),
  name: 'edit',
  meta: { title: 'edit', extends: 'menu1-2-2' },
  hidden: true,
},
```
## 多路由嵌套
可以看我定义的<a href="https://github.com/yuang01/remark-ui-vue/blob/master/src/router/index.js">router</a>中的nested路由，使用children便可以定义子路由，支持无限嵌套，也就是说可以有n个子路由，左侧导航栏有n个子栏目。在这里我的左侧导航栏使用的是递归组件的写法。但是需要注意的是每创建一个嵌套子路由需要定义一个`<router-view />`，详情可以参考我的<a href="https://github.com/yuang01/remark-ui-vue/tree/master/src/views/nested">@/views/nested</a>文件夹


## 左侧导航栏折叠方式
如果想在只保持一个菜单展开的话可以在导航栏组件上传递一个unique-opened的prop，默认为true（只保持一个菜单展开），false的话，就可以让多个菜单展开。
> 代码地址
https://github.com/yuang01/remark-ui-vue/blob/master/src/views/Layout/Menubar/Body.vue
在这个位置传递unique-opened即可。

# 结语
觉得还不错的朋友可以star<a href="https://github.com/yuang01/remark-ui-vue">项目</a>哦

