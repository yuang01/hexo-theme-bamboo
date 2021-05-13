'use strict';

function postFancybox(args, content) {
  args = args.join(' ').split(',');
  var cls = args[0];
  var col = Number(args[1]) || 0;
  if (col > 0) {
    return `<div class="gallery ${cls}" col='${col}'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
            </div>`;
  }
  return `<div class="gallery ${cls}">
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
            </div>`;

}

const urlFor = require('hexo-util').url_for.bind(hexo)
function postGalleryGroup (args) {
  const name = args[0]
  const desrc = args[1]
  const url = urlFor(args[2])
  const img = urlFor(args[3])

  return `
  <figure class="gallery-group">
  <img class="gallery-group-img" src='${img}' alt="Group Image Gallery">
  <figcaption>
  <div class="gallery-group-name">${name}</div>
  <p>${desrc}</p>
  <a href='${url}'></a>
  </figcaption>
  </figure>
  `
}

hexo.extend.tag.register('gallery', postFancybox, {ends: true});
hexo.extend.tag.register('galleryGroup', postGalleryGroup)
