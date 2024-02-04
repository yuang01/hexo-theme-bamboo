"use strict";

const fs = require("hexo-fs");

function getPhoto(args, content) {
  args = args.join(" ").split(",");
  let mkdirPath = "";
  let isRegular = "";
  if (args.length < 1) {
    return;
  } else if (args.length == 1) {
    mkdirPath = args[0].trim();
  } else if (args.length == 2) {
    mkdirPath = args[0].trim();
    isRegular = args[1].trim();
  }
  let path = `./source/${mkdirPath}`
  let isExist = fs.existsSync(path);
  if (!isExist) {
    return `<span style="color:red">source/${mkdirPath} folder does not exist, please confirm whether the folder is created！</span>`;
  }
  const files = fs.listDirSync(`./source/${mkdirPath}`);
  let photoFiles = files.filter((el) => {
    let suffix = el.substring(el.lastIndexOf(".") + 1);
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
  let str = '<div class="waterfall-picture-container">';
  let index = 0;
  if (photoFiles.length > 0) {
    let box = renderBox(photoFiles, index, mkdirPath, isRegular);
    str = str + box;
  } else {
    str = str + `<span style="color:red">source/${mkdirPath} are no files in this folder！</span>`;
  }
  str = str + "</div>";
  return str;
}
function renderBox(files, index, mkdirPath, isRegular, preRandom = '', result = "") {
  let colums = isRegular ? 2 : getRandomRange(2, 4, preRandom);
  preRandom = colums;
  let preIndex = index;
  index = index + colums;
  let imgsHtml = "";
  let urls = files.slice(preIndex, index);
  if (index >= files.length) {
    colums = urls.length;
  }
  for (let i = 0; i < urls.length; i++) {
    imgsHtml = imgsHtml + `<img src="/${mkdirPath}/${urls[i]}" />`;
  }
  let gallery = `<div class="gallery stretch" col="${colums}"><p>${imgsHtml}</p></div>`;
  result = result + gallery;
  if (index < files.length) {
    return renderBox(files, index, mkdirPath, isRegular, preRandom, result);
  }
  return result;
}
// 随机生成范围整数
function getRandomRange(min, max, preRandom) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (preRandom === randomNumber) {
    return getRandomRange(min, max, preRandom)
  }
  return randomNumber;
}
hexo.extend.tag.register("getPhoto", getPhoto);
