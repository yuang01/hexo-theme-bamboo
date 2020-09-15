// window.onload = function () {
  let backbtn = document.getElementsByClassName('goTop')[0];
  let timer = null; // 定义定时器
  let isTop = true; // 中途可以停止返回顶部
  // 刷新页面判断火箭是否显示
  isshow();
  // 窗口滚动判断火箭是否显示
  window.onscroll = function () {
    if(isTop === false){
      clearInterval(timer);//当isTop变成了false的时候就停止定时器
      // backbtn.style.transform = 'translateY(0)';
    }
    isTop = false; //当鼠标再次滚动的时候，isTop就变成了false
    isshow();
  }
  // 判断火箭显示与否
  function isshow() {
    // or > document.documentElement.clientHeight 大于一个屏幕
    if (( document.documentElement.scrollTop || document.body.scrollTop ) > 100 ) {
      backbtn.style.display = 'block';//如果滚条的高度大于窗口的高度，按钮就会显示出来，否则按钮消失
      backbtn.style.transform = 'translateY(0)';
    } else {
      backbtn.style.transform = 'translateY(100px)';
      // backbtn.style.display = 'none';
    }
  }
  // 当鼠标移动到返回顶部按钮时，增加类fly
  backbtn.onmouseover = function () {
    this.classList.add('fly');
  }
  // 当鼠标移出的时候，删除类fly
  backbtn.onmouseout = function () {
    this.classList.remove('fly');
  }
  // 当点击小火箭，返货顶部，并且火箭上升
  backbtn.onclick = function () {
    timer = setInterval(() => {
      isTop = true; //当点击按钮的时候，isTop为true，就不会清除定时器
      let ostop = document.documentElement.scrollTop || document.body.scrollTop;
      let ospeed = Math.ceil(ostop / 8);//先获取一个速度
      document.documentElement.scrollTop = document.body.scrollTop = ostop-ospeed;//由快到慢的速度
      // backbtn.style.transform = 'translateY(-1000px)'; // 打开这个注释，再给css一个动画效果，会看到火箭向上冲的效果
      if ( ostop === 0 ) {
        clearInterval(timer);
        // backbtn.style.transform = 'translateY(0)';
      }
    },30);
  }
// }