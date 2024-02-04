const getPhotoJson = {
  requestJsonAPI(url, callback, timeout) {
    let retryTimes = 10;
    function request() {
      return new Promise((resolve, reject) => {
        let status = 0; // 0 等待 1 完成 2 超时
        let timer = setTimeout(() => {
          if (status === 0) {
            status = 2;
            timer = null;
            reject('请求超时');
            if (retryTimes == 0) {
              timeout();
            }
          }
        }, 5000);
        fetch(url).then(function(response) {
          if (status !== 2) {
            clearTimeout(timer);
            resolve(response);
            timer = null;
            status = 1;
          }
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        }).then(function(data) {
          retryTimes = 0;
          callback(data);
        }).catch(function(error) {
          if (retryTimes > 0) {
            retryTimes -= 1;
            setTimeout(() => {
              request();
            }, 5000);
          } else {
            timeout();
          }
        });
      });
    }
    request();
  },
  filterData(cfg, data) {
    let photoFiles = data.filter((el) => {
      let imgPath = el.img || el.url || el.imgurl;
      let suffix = imgPath.substring(imgPath.lastIndexOf(".") + 1);
      let isPhotoTypeArr = [
        "bmp",
        "jpg",
        "png",
        "tif",
        "gif",
        "pcx",
        "tga",
        "exif",
        "fpx",
        "psd",
        "cdr",
        "pcd",
        "dxf",
        "ufo",
        "eps",
        "ai",
        "raw",
        "WMF",
        "webp",
        "jpeg",
      ];
      if (isPhotoTypeArr.includes(suffix)) {
        return el;
      }
    });
    return photoFiles;
  },
  renderBox(files, index, mkdirPath, isRegular, el, preRandom = '', result = "") {
    let colums = isRegular ? 2 : getPhotoJson.getRandomRange(2, 4, preRandom);
    preRandom = colums;
    let preIndex = index;
    index = index + colums;
    let imgsHtml = "";
    let urls = files.slice(preIndex, index);
    if (index >= files.length) {
      colums = urls.length;
    }
    for (let i = 0; i < urls.length; i++) {
      let path = urls[i].img || urls[i].url || urls[i].imgurl
      let title = urls[i].alt || urls[i].title;
      imgsHtml = imgsHtml + `<div class="fancybox"><a href="${path}" class="fancybox" data-fancybox="images" data-caption="${title}"><img src="${path}" alt="${title}" /></a><span class="image-caption">${title}</span></div>`;
    }
    let gallery = `<div class="gallery stretch" col="${colums}">${imgsHtml}</div>`;
    $(el).find('.waterfall-picture-container').append(gallery);
    result = result + gallery;
    if (index < files.length) {
      return getPhotoJson.renderBox(files, index, mkdirPath, isRegular, el, preRandom, result);
    }
    return result;
  },
  // 随机生成范围整数
  getRandomRange(min, max, preRandom) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (preRandom === randomNumber) {
      return getPhotoJson.getRandomRange(min, max, preRandom)
    }
    return randomNumber;
  },
  getJsonAPIForSites(cfg) {
    const el = $(cfg.el)[0];
    // 注释部分为严格判断是否为.json结尾的文件
    // let suffix = cfg.api.substring(cfg.api.lastIndexOf(".") + 1); // 判断是否为json文件
    // if (suffix !== 'json') {
    // 	$(el).append(`<p style="color:red">地址错误：${cfg.api}， 只允许.json格式结尾的文件!</p>`);
    // 	return false;
    // }
    $(el).append('<div class="loading"><i class="fas fa-cog fa-2x fa-spin"></i><p>正在加载</p></div>');
    this.requestJsonAPI(cfg.api, function(data) {
      $(el).find('.loading').remove();
      const dt = getPhotoJson.filterData(cfg, data); // 过滤返回数据为图片格式的才行
      // const dt = data; // 也可以不过滤
      $(el).append('<div class="waterfall-picture-container"></div>')
      let index = 0;
      if (dt.length > 0) {
        let isRegular = cfg.isRegular || null;
        let box = getPhotoJson.renderBox(dt, index, cfg.api, isRegular, el);
        
      } else {
        $(el).find('.waterfall-picture-container').append(`<p style="color:red">${cfg.api} 没有图片链接</p>`);
      }
    }, function() {
      $(el).find('.loading i').remove();
      $(el).find('.loading p').text('加载失败，请稍后重试。');
    })
  },
  request() {
    const els = document.getElementsByClassName('getJsonPhoto-api');
    for (var i = 0; i < els.length; i++) {
      const el = els[i];
      const api = el.getAttribute('api');
      const isRegular = el.getAttribute('isRegular');
      var cfg = new Object();
      cfg.class = el.getAttribute('class');
      cfg.el = el;
      cfg.api = api;
      cfg.isRegular = isRegular;
      this.getJsonAPIForSites(cfg);
    }
  }
}

getPhotoJson.request();
document.addEventListener('pjax:complete', function() {
  getPhotoJson.request();
});
