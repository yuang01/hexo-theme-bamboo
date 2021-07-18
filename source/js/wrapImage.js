$(document).ready(function () {
  wrapImageWithFancyBox();
});

/**
* Wrap images with fancybox support.
*/
function wrapImageWithFancyBox() {
  $.fancybox.defaults.hash = false;
  $(".post-detail").find("img").not('.swiper-slide img').not('.sidebar-image img').not('#author-avatar img').not(".post-donate img").not(".post-donate img").not(".friend-avatar img").not('[title=notice]').not("#myComment img").not(".social-share .qrcode img").not(".ghcard img").not('img.inline').not(".site-card img").not(".link-card img").not('.btns img').each(function () {
    var $image = $(this);
    var imageCaption = $image.attr('alt');
    var $imageWrapLink = $image.parent('a');
    var $linkWrapDiv = $imageWrapLink.parent('div');
    if ($imageWrapLink.length < 1) {
      var src = this.getAttribute('data-original') || this.getAttribute('src');
      var idx = src.lastIndexOf('?');
      if (idx != -1) {
        src = src.substring(0, idx);
      }
      $imageWrapLink = $image.wrap('<a href="' + src + '" class="fancybox"></a>').parent('a');
      $linkWrapDiv = $imageWrapLink.wrap('<div class="fancybox"></div>').parent('div');
    }

    $imageWrapLink.attr('data-fancybox', 'images');
    if (imageCaption) {
      $imageWrapLink.attr('data-caption', imageCaption);
      $linkWrapDiv.append('<span class="image-caption">'+ imageCaption +'</span>')
    }

  });

  $('[data-fancybox="images"]').fancybox({
    buttons: [
      'slideShow',
      'thumbs',
      'zoom',
      'fullScreen',
      'close'
    ],
    thumbs: {
      autoStart: false
    }
  });
}