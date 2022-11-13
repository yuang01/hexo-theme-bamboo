'use strict';

function postTitle(args) {
    args = args.join(' ').split(', ')
    const h = args[0].trim();
    const text = args[1].trim();
    let cls = '';
    if (args[2]) {
        cls = args[2].trim();
    }
    let uniqueId = createUniqueId(1)[0];
    if (h == 'h1') {
        return `<h1 class="bamboo-h ${cls}" id="${text + uniqueId}">${text}</h1><br/>`
    } else if (h == 'h2') {
        return `<h2 class="bamboo-h ${cls}" id="${text + uniqueId}">${text}</h2><br/>`
    } else if (h == 'h3') {
        return `<h3 class="bamboo-h ${cls}" id="${text + uniqueId}">${text}</h3><br/>`
    } else if (h == 'h4') {
        return `<h4 class="bamboo-h ${cls}" id="${text + uniqueId}">${text}</h4><br/>`
    } else if (h == 'h5') {
        return `<h5 class="bamboo-h ${cls}" id="${text + uniqueId}">${text}</h5><br/>`
    } else if (h == 'h6') {
        return `<h6 class="bamboo-h ${cls}" id="${text + uniqueId}">${text}</h6><br/>`
    } else {
        return `<h2 class="bamboo-h ${cls}" id="${text + uniqueId}">${text}</h2><br/>`
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
hexo.extend.tag.register('title', postTitle);