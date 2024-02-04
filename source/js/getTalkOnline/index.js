const getTalkJson = {
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
  renderBox(files, index, mkdirPath, isRegular, el, preRandom = '', result = "") {
    let colums = isRegular ? 3 : getTalkJson.getRandomRange(2, 4, preRandom);
    preRandom = colums;
    let preIndex = index;
    index = index + colums;
    let cardHtml = "";
    let urls = files.slice(preIndex, index);
    if (index >= files.length) {
      colums = urls.length;
    }
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i].url || urls[i].href;
      let text = urls[i].text || urls[i].content;
      let img = urls[i].img || urls[i].image;
      let date = urls[i].date || urls[i].datetime || urls[i].time;
			let musicId = urls[i].musicId;

			let linkHtml = '';
			let musicHtml = '';
			let timeHtml = '';
			let imgHtml = '';
			if (url) {
				linkHtml = `
					<a class="link" href="${url}" rel="external nofollow" target="_blank" title="跳转到链接">
						<i class="fa-solid fa-link"></i>
						链接
					</a>`;
			}
			if (musicId) {
				// 固定写死网易云单曲,输入id
        musicHtml = `
          <div class="music">
            <meting-js  
              class=""
              server="netease"
              type="song"
              id="${musicId}"
              fixed=false
              autoplay='false'
              theme='#42b983'
              loop='all'
              order='list'
              preload='auto'
              volume='0.7'
              list-folded=true
              hideLrc=false
          >
        </div>
          `
			}
			if (date) {
				timeHtml = `
				<div class="time">
					<i class="fa-solid fa-calendar-days"></i>
					<time class="datatime" datetime="${date}">${date}</time>
				</div>`
			}
			if (img) {
				imgHtml = `
				<div class="img">
					<div class="fancybox">
						<a href="${img}" class="fancybox" data-fancybox="images">
							<img src="${img}" alt="${img}">
						</a>
					</div>
				</div>
				`
			}
      cardHtml = cardHtml + `
        <div class="talk-card">
          <div class="talk-content">
              <p>${text}</p>
              ${imgHtml}
							${musicHtml}
          </div>
          <div class="hr"></div>
          <div class="talk-bottom">
              <div class="date-info">
                  ${timeHtml}
									${linkHtml}
              </div>
          </div>
      </div>
      `;
    }
    let talkCard = `${cardHtml}`;
    $(el).append(talkCard);
    result = result + talkCard;
    
    if (index < files.length) {
      return getTalkJson.renderBox(files, index, mkdirPath, isRegular, el, preRandom, result);
    }
    return result;
  },
  // 随机生成范围整数
  getRandomRange(min, max, preRandom) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (preRandom === randomNumber) {
      return getTalkJson.getRandomRange(min, max, preRandom)
    }
    return randomNumber;
  },
  getJsonAPIForTalk(cfg) {
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
      const dt = data.slice(0, 30); // 取json的前30个
      let index = 0;
      if (dt.length > 0) {
        let isRegular = cfg.isRegular || null;
        let box = getTalkJson.renderBox(dt, index, cfg.api, isRegular, el);
        waterfall(el);
      } else {
        $(el).append(`<p style="color:red">${cfg.api} 没有图片链接</p>`);
      }
    }, function() {
      $(el).find('.loading i').remove();
      $(el).find('.loading p').text('加载失败，请稍后重试。');
    })
  },
  request() {
    const els = document.getElementsByClassName('getJsonTalk-api');
    for (var i = 0; i < els.length; i++) {
      const el = els[i];
      const api = el.getAttribute('api');
      const isRegular = el.getAttribute('isRegular');
      var cfg = new Object();
      cfg.class = el.getAttribute('class');
      cfg.el = el;
      cfg.api = api;
      cfg.isRegular = isRegular;
      this.getJsonAPIForTalk(cfg);
    }
  }
}

getTalkJson.request();
document.addEventListener('pjax:complete', function() {
  getTalkJson.request();
});