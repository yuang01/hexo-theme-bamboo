"use strict";

hexo.extend.tag.register(
  "swiper",
  function (args, content) {
    args = hexo.args.map(args, ["width"]);
    var el = "";
    function slide() {
      let imgs = hexo.render.renderSync({ text: content, engine: "markdown" });
      imgs = imgs.match(/<img(.*?)src="(.*?)"(.*?)>/gi);

      if (imgs && imgs.length > 0) {
        imgs.forEach((img, i) => {
          let src = "";
          let href = "";
          let alt = "";
          let regxSrc = /\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
          let resSrc = img.match(regxSrc);
          if (resSrc) {
            src = resSrc[1];
          }
          let regxHref = /\bhref\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
          let resHref = img.match(regxHref);
          if (resHref) {
            href = resHref[1];
          }
          let regxAlt = /\balt\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
          let resAlt = img.match(regxAlt);
          if (resAlt) {
            alt = resAlt[1];
          }
          let image = `<img no-lazy class="swiper-slide-img" src="${src}">`;
          img = `<a class="swiper-slide-href_tag" href="${
            href ? href : "javascript:;"
          }"><p class="ani animated swiper-slide-desc_tag" swiper-animate-effect="fadeInDown">${alt}</p>${image}</a>`;
          // img = img.replace('<img src', '<img no-lazy class="swiper-slide-img" src');
          el += '<div class="swiper-slide">' + img + "</div>";
        });
      }
    }
    el += '<div class="tag-plugin post-swiper-container"';
    if (args.width && args.width.length > 0) {
      el += " " + hexo.args.joinTags(args, "width").join(" ");
    }
    el += ">";
    el += '<div class="swiper-wrapper">';
    slide();
    el += "</div>";
    el += '<div class="swiper-pagination"></div>';
    el += '<div class="swiper-button-prev blur"></div>';
    el += '<div class="swiper-button-next blur"></div>';
    el += "</div>";
    return el;
  },
  { ends: true }
);
