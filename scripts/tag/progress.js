'use strict';
function postprogress(args) {
  args = args.join(',').split(',')
  if (args.length > 1) {
    let cls = args[0].trim()
    let clsa = args[1].trim()
    let text = args[2].trim()
    const obj = {
      'primary': hexo.theme.config.color_scheme.common.theme,
      'success': hexo.theme.config.tag_plugins.successColor,
      'info': hexo.theme.config.tag_plugins.infoColor,
      'warning': hexo.theme.config.tag_plugins.warningColor,
      'danger': hexo.theme.config.tag_plugins.dangerColor
    };
    if (obj[clsa]) {
      return `<div class="progress"><div class="progress-bar-animated progress-bar progress-bar-striped bg-${clsa}"  style="width: ${cls}%" aria-valuenow="${cls}" aria-valuemin="0" aria-valuemax="100">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div></div>`;
    } else {
      return `<div class="progress"><div class="progress-bar-animated progress-bar progress-bar-striped" style="background-color: ${clsa}!important; width: ${cls}%" aria-valuenow="${cls}" aria-valuemin="0" aria-valuemax="100">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div></div>`;
    }
  }
}
function postProgressCircle(args) {
  args = args.join(',').split(',')
  if (args.length > 1) {
    let cls = args[0].trim()
    let clsa = args[1].trim()
    let text = args[2].trim()
  
    let percent = cls;
    let strokeWidth = 12;
    let size = 130;
    const obj = {
      'primary': hexo.theme.config.color_scheme.common.theme,
      'success': hexo.theme.config.tag_plugins.successColor,
      'info': hexo.theme.config.tag_plugins.infoColor,
      'warning': hexo.theme.config.tag_plugins.warningColor,
      'danger': hexo.theme.config.tag_plugins.dangerColor
    };
    let circleSize = size + (strokeWidth / 2);
    let circleStyle = `${circleSize}px`;
    let radius = circleSize - strokeWidth / 2;
    let pathString = `M ${circleSize},${circleSize} m 0,-${radius}
    a ${radius},${radius} 0 1 1 0,${2 * radius}
    a ${radius},${radius} 0 1 1 0,-${2 * radius}`;
    let len = Math.PI * 2 * radius;
    let themeStatusColor = obj[clsa] ? obj[clsa] : clsa;
    return `
    <div class="bamboo-circle" style="height: ${circleStyle};">
      <svg width="${circleSize}" height="${circleSize}" viewBox="0 0 ${circleSize*2} ${circleSize*2}">
        <path d="${pathString}" stroke="#f3f3f3" stroke-width="${strokeWidth}" fill-opacity="0"></path>
        <path d="${pathString}" stroke-linecap="round" stroke="${themeStatusColor}" stroke-width="${strokeWidth}" fill-opacity="0" style="stroke-dasharray: ${len}px ${len}px; stroke-dashoffset: ${((100 - percent) / 100 * len)}px; transition:stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;"></path>
      </svg>
      <div class="bamboo-circle-content bamboo-circle-${clsa}">
        ${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}
      </div>
    </div>`;
  }
}

hexo.extend.tag.register('progress', postprogress);
hexo.extend.tag.register('progressCircle', postProgressCircle);