'use strict';

function postP(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<p class='p ${p0}'>${p1}</p>`;
}
function postSpan(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<span class='p ${p0}'>${p1}</span>`;
}

function postPBackground(args) {
    args = args.join(' ').split(',')
    let p0 = args[0].trim()
    let p1 = args[1].trim()
    return `<span class='pbg ${p0}'>${p1}</span>`;
}

hexo.extend.tag.register('p', postP);
hexo.extend.tag.register('span', postSpan);
hexo.extend.tag.register('pbg', postPBackground);
