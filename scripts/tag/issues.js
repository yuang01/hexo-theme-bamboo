
'use strict';

// 从 issues 加载动态数据
// {% issues sites/timeline | api=xxx | group=key:a,b,c %}
hexo.extend.tag.register('issues', function(args) {
  args = args.join(' ').split(' | ');
  // 所有支持的参数
  let type = args[0].trim();
  let api = '';
  let group = '';
  // 解析
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      const tmp = args[i].trim();
      if (tmp.includes('type=')) {
        type = tmp.substring(5, tmp.length);
      } else if (tmp.includes('api=')) {
        api = tmp.substring(4, tmp.length);
      } else if (tmp.includes('group=')) {
        group = tmp.substring(6, tmp.length);
      }
    }
  }
  if (type.length == 0 || api.length == 0) {
    return;
  }
  // 布局
  let ret = '<div class="issues-api ' + type + '"';
  ret += 'api="' + api + '"';
  if (group.length > 0) {
    ret += 'group="' + group + '"';
  }
  ret += '></div>';
  return ret;
});
