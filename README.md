# hexo-theme-bamboo
这是一个基于Hexo的响应式博客主题，[演示示例](https://yuang01.gitee.io/)

最新文档，请[点击这个查看（github）](https://yuang01.github.io/2021/02/08/hexo-theme-bamboo-new/)，或者[点击这个查看（gitee）](https://yuang01.gitee.io/2021/02/08/hexo-theme-bamboo-new/)，
<!-- more -->
## 下载
首先你需要有一个[Hexo](https://hexo.io/zh-cn/)，按照官网的方法，很容易的就能创建一个hexo博客。
#### 当你有了hexo博客之后，进入`themes`文件夹下使用 `Git clone` 命令来下载:
github安装
``` bash
git clone https://github.com/yuang01/hexo-theme-bamboo.git
```
gitee安装
```bash
git clone https://gitee.com/yuang01/hexo-theme-bamboo.git
```
修改hexo根目录下的站点配置文件`_config.yml`，把主题改为`hexo-theme-bamboo`，通过主题文件夹下的`config.yml`配置主题即可

#### 或者npm来安装，进入hexo根目录使用如下命令
```bash
npm i hexo-theme-bamboo
```
注意：此方法只支持Hexo在5.0.0版本以上
**通过 npm 安装并不会在 themes 里生成主题文件夹，而是在 node_modules 里生成**
修改hexo根目录下的站点配置文件`_config.yml`，把主题改为`bamboo`

接着在hexo根目录下新建文件`_config.bamboo.yml`,从`node_modules`文件夹下找到`hexo-theme-bamboo`文件夹下的`_config.yml`，将里面的内容复制到`_config.bamboo.yml`文件中即可，在`_config.bamboo.yml`文件中对主题进行配置
