// 移动端是否可以使用jquery
// 1.1:当然可以使用js库 但是 不建议使用
// 1.2：特点是兼容性好 体积大 加载慢 80kb 【在js中超过100kb的都是重量级的库】
// 解决方法：使用H5API
// window.onload = function(ev){};页面所有资源加载完成后执行
// $(function(){});页面文档加载完成后执行，不包括资源
document.addEventListener("DOMContentLoaded", function() {
  new Search(".jd_header_box");
  /*实现轮播图 */
  // 1：自动轮播图（无缝滚动，滑动无缝）
  // 2：点做对应的改变
  // 3：实现滑动功能
  // 4：当滑动的距离不够吸附回去
  // 5：当滑动的距离足够 切换图片 上一张 下一张
  // 6：当滑动的距离足够 切换图片 上一张 下一张
  // 建议：大家使用面向对象的方式
  new banner();
});

// =============这里是搜索功能=====================================
var Search = function(selector) {
  this.el = document.querySelector(selector);
  this.bannerHeight = document.querySelector(".jd_banner").offsetHeight;
  this.maxOpacity = 0.85;
  this.init();
};

Search.prototype.init = function() {
  // console.log(1);
  var that = this;
  // 业务逻辑
  // 1：background:rgba(216,80,92,0);完全透明
  that.el.style.background = "rgba(216,80,92,0)";
  // 2：当页面滚动的时候，透明度改变
  window.onscroll = function(ev) {
    // 滚动的距离 卷曲的大小
    var scrollTop =
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop;
    // 轮播图的高度
    // that.bannerHeight;
    var opcity = 0;
    // 2.1：当在轮播图内滚动的时候 滚动的距离越多透明度越多
    if (scrollTop < that.bannerHeight) {
      opcity = (scrollTop / that.bannerHeight) * that.maxOpacity;
    }
    // 2.2:当已经滚出了轮播图 透明度固定不变 0.85
    else {
      opcity = that.maxOpacity;
    }
    that.el.style.background = "rgba(216,80,92," + opcity + ")";
  };
};

// =============这里是轮播图功能=====================================
var banner = function(selector) {
  this.el = document.querySelector(selector || ".jd_banner");
  //获取每次切换的宽度
  this.width = this.el.offsetWidth;
  //获取图片容器
  this.imageBox = this.el.querySelector("ul:nth-child(1)");
  //获取点容器
  this.pointBox = this.el.querySelector("ul:nth-child(2)");
  //定义一个定时器
  this.timer = null;
  // 索引
  this.index = 1;
  // 切换的时间
  this.interval = 3000;
  // 丰富属性
  this.init();
};
// 丰富方法
banner.prototype.init = function() {
  // 入口函数
  this.autoPlay();
  this.animated();
  this.initSwipe();
};
// 这里是定义一个方法
banner.prototype.autoPlay = function() {
  var that = this;
  // 自动轮播
  that.timer = setInterval(function() {
    that.index++;
    // 动画的切换的下一张
    // 动画
    that.addTransition();
    var translateX = -that.index * that.width;
    that.setTranslateX(translateX);
  }, this.interval);
};
//等索引为9 且动画执行完毕 瞬间定位到索引为1的图片位置
// 监听动画结束事件
banner.prototype.animated = function() {
  var that = this;
  // 动画结束后的处理函数
  that.imageBox.addEventListener("transitionend", function() {
    // console.log(that.index); //动画结束后打印，当打印为9时，进行无缝切换
    if (that.index >= 9) {
      that.index = 1;
      // 瞬间移动：去除过渡后，进行位移改变
      var translateX = -that.index * that.width;
      that.removeTransition();
      that.setTranslateX(translateX);
    }
    // 当你滑动到最左边的图片（索引为0）时 瞬间切换到第八张图的位置
    else if (that.index <= 0) {
      that.index = 8;
      var translateX = -that.index * that.width;
      that.removeTransition();
      that.setTranslateX(translateX);
    }
    //设置点
    that.setPoint();
  });
};
banner.prototype.setPoint = function() {
  // 根据索引去设置 图片的索引为0-》点7 图片索引9-》点0 图片1-8-》点0-7
  // 去掉之前的选中
  this.pointBox.querySelector("li.now").classList.remove("now");
  // 给当前的选中
  this.pointBox.querySelectorAll("li")[this.index - 1].classList.add("now");
};
// 实现滑动相关的功能
banner.prototype.initSwipe = function() {
  var that = this;
  // 1:滑动（图片容器随着手指的滑动进行位移）
  var startX = 0;
  that.imageBox.addEventListener("touchstart", function(e) {
    console.log("s");
    startX = e.touches[0].clientX; //起始的坐标
  });
  that.imageBox.addEventListener("touchmove", function(e) {
    // var moveX = e.touches[0].clientX; //滑动中的坐标
    // var distance = moveX - startX; //坐标的改变
    // console.log("m");
    // console.log(distance);
    console.log("m");
  });
  that.imageBox.addEventListener("touchend", function(e) {
    console.log("ee");
  });
};
// 优化：
// 加过渡
banner.prototype.addTransition = function() {
  this.imageBox.style.transition = "all 0.3s";
  this.imageBox.style.webkitTransition = "all 0.3s";
};
// 去过渡
banner.prototype.removeTransition = function() {
  this.imageBox.style.transition = "none";
  this.imageBox.style.webkitTransition = "none";
};
// 改变位移
banner.prototype.setTranslateX = function(translateX) {
  this.imageBox.style.transform = "translateX(" + translateX + "px)";
  this.imageBox.style.webkittransform = "translateX(" + translateX + "px)";
};
