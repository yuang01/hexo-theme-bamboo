'use strict';

function postTitle(args) {
    args = args.join(' ').split(', ')
    const h = args[0].trim();
    const text = args[1].trim();
    let cls = '';
    if (args[2]) {
        cls = args[2].trim();
    }
    if (h == 'h1') {
        return `<h1 class="bamboo-h ${cls}" id="${text}">${text}</h1><br/>`
    } else if (h == 'h2') {
        return `<h2 class="bamboo-h ${cls}" id="${text}">${text}</h2><br/>`
    } else if (h == 'h3') {
        return `<h3 class="bamboo-h ${cls}" id="${text}">${text}</h3><br/>`
    } else if (h == 'h4') {
        return `<h4 class="bamboo-h ${cls}" id="${text}">${text}</h4><br/>`
    } else if (h == 'h5') {
        return `<h5 class="bamboo-h ${cls}" id="${text}">${text}</h5><br/>`
    } else if (h == 'h6') {
        return `<h6 class="bamboo-h ${cls}" id="${text}">${text}</h6><br/>`
    } else {
        return `<h2 class="bamboo-h ${cls}" id="${text}">${text}</h2><br/>`
    }
}

hexo.extend.tag.register('title', postTitle);