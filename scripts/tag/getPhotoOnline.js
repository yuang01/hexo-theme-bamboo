'use strict';

// 加载远程json动态数据
hexo.extend.tag.register('getPhotoOnline', function (args) {
  args = args.join(" ").split(",");
  let jsonPath = "";
  let isRegular = "";
  if (args.length < 1) {
    return;
  } else if (args.length == 1) {
    jsonPath = args[0].trim();
  } else if (args.length == 2) {
    jsonPath = args[0].trim();
    isRegular = args[1].trim();
  }
  // 布局
  let ret = `<div class="getJsonPhoto-api" api="${jsonPath}" isRegular="${isRegular}"></div>`
  return ret;
});