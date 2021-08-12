'use strict';

const fs = require('hexo-fs');

function getFIles(args, content) {
    args = args.join(' ').split(',');
    let mkdirPath = '';
    let fileType = '';
    let img = '';
    if (args.length < 1) {
        return;
    } else if (args.length == 1) {
        mkdirPath = args[0].trim();
    } else if (args.length == 2) {
        mkdirPath = args[0].trim();
        fileType = args[1].trim() ? args[1].trim().split(/[ ]+/) : '';
    } else if (args.length == 3) {
        mkdirPath = args[0].trim();
        fileType = args[1].trim() ? args[1].trim().split(/[ ]+/) : '';
        img = args[2].trim();
    }
    const files = fs.listDirSync(`./source/${mkdirPath}`);
    let str = '<div class="link-group">';
    if (files.length > 0) {
        let fileNumber = 0;
        files.forEach(function (item, index) {
            if (fileType) {
                //获取后缀
                let ext = item.substr(item.lastIndexOf(".") + 1);
                if (fileType.indexOf(ext) >= 0) {
                    fileNumber = fileNumber + 1;
                    str = renderFileLink(item, str, img, mkdirPath);
                }
            } else {
                str = renderFileLink(item, str, img, mkdirPath);
            }
        })

        if (fileType && fileNumber == 0) {
            str = str + `<span>There are no files of type ${fileType} in this folder</span>` 
        }
    } else {
        str = str + '<span>There are no files in this folder</span>' 
    }
    str = str + '</div>';
    return str;
}

function renderFileLink(item, str, img, mkdirPath) {
    let result = '';
    let text = item;
    let url = `/${mkdirPath}/${item}`;
    result += '<div class="tagLink"><a class="link-card" no-pjax target="_blank" title="' + text + '" href="' + url + '">';
    result += '<span class="link-card-backdrop" style="background-image: url(' + (img || hexo.theme.config.tag_plugins.linkImg) + ')"></span>';
    // left
    result += '<div class="left">';
    result += '<img src="' + (img || hexo.theme.config.tag_plugins.getFileImg) + '"/>';
    result += '</div>';
    // right
    result += '<div class="right"><p class="text">' + text + '</p><p class="url">' + url + '</p></div>';
    result += '</a></div>';
    str = str + result;
    return str;
}

hexo.extend.tag.register('getFiles', getFIles);
