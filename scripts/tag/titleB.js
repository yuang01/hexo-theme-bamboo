'use strict';

function postTitleB(args) {
    args = args.join(' ').split(', ')
    const h = args[0].trim();
    const text = args[1].trim();
    let cls = '';
    let bg = '';
    if (args[2]) {
        bg = args[2].trim();
        if (bg.includes('bg=')) {
            bg = bg.substring(3, bg.length);
        }
    }
    let uniqueId = createUniqueId(1)[0];
    if (h == 'h1') {
        return `<h1 class="bamboo-h-b" id="${text + uniqueId}" style="color:${bg}!important">${text}</h1><div></div>`
    } else if (h == 'h2') {
        return `<h2 class="bamboo-h-b" id="${text + uniqueId}" style="color:${bg}!important">${text}</h2><div></div>`
    } else if (h == 'h3') {
        return `<h3 class="bamboo-h-b" id="${text + uniqueId}" style="color:${bg}!important">${text}</h3><div></div>`
    } else if (h == 'h4') {
        return `<h4 class="bamboo-h-b" id="${text + uniqueId}" style="color:${bg}!important">${text}</h4><div></div>`
    } else if (h == 'h5') {
        return `<h5 class="bamboo-h-b" id="${text + uniqueId}" style="color:${bg}!important">${text}</h5><div></div>`
    } else if (h == 'h6') {
        return `<h6 class="bamboo-h-b" id="${text + uniqueId}" style="color:${bg}!important">${text}</h6><div></div>`
    } else {
        return `<h2 class="bamboo-h-b" id="${text + uniqueId}" style="color:${bg}!important">${text}</h2><div></div>`
    }
}
function createUniqueId(n) {
    var random = function() { // 生成10-12位不等的字符串
        return Number(Math.random().toString().substr(2)).toString(36); // 转换成十六进制
    };
    var arr = [];
    function createId() {
        var num = random();
        var _bool = false;
        arr.forEach(v => {
            if(v === num) _bool = true;
        });
        if(_bool) {
            createId();
        }else {
            arr.push(num);
        }
    }
    var i = 0;
    while(i < n) {
        createId();
        i++;
    }
    return arr;
}
hexo.extend.tag.register('titleB', postTitleB);