// 1:移动端是否可以使用jquery?
// 1.1当然可以使用js库 但是不建议使用
// 1.2：特点是兼容性好  体积大  加载慢 80kb
// 使用H5api
// window.onload = function(ev){}页面所有资源加载完成
// $(function(){});页面文档加载完成
// 以下以面向对象来实现
document.addEventListener("DOMContentLoaded", function() {
  new Search(".jd_header_box");
});
var Search = function(selector) {
  this.el = document.querySelector(selector);
  this.bannerHeight = document.querySelector(".jd_banner").offsetHeight;
  this.maxOpacity = 0.85;
  this.init();
};
Search.prototype.init = function() {
  // console.log(0);
  var that = this;
  // 业务逻辑
  // 1:搜索条随着不断滚动,透明度的变化,本质上是background中rgba()中a的变化
  that.el.style.background = "rgba(216,80,92,0)";
  // 2：a中的变化，在顶部的时候是完全透明的变化，当拉出轮播图区后，透明度逐渐变低
  // 这样的话，就需要传一个参数，根据这个参数的变化，来改变顶部搜索栏的透明度
  // 当页面滚动的时候，需要监听这个对象:window.onscroll
  window.onscroll = function(ev) {
    // console.log(0);
    // 滚动的距离 或者叫卷曲的大小
    var scrollTop =
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop;
    // 轮播图的高度 that.bannerHeight;
    var opacity = 0;
    // 2.1：当在轮播图以内滚动的时候， 滚动的距离越多透明度越多
    if (screenTop < that.bannerHeight) {
      opacity = (screenTop / that.bannerHeight) * that.maxOpacity;
    }
    // 2.2：当已经滚出轮播图的时候 透明度固定不变 固定为0.85
    else {
      opacity = that.maxOpacity;
    }
    that.el.style.background = "rgba(216,80,92," + opacity + ")";
  };
};

// 步骤：
// 首先把构造函数和对象创建出来，并进行尝试，成功打印出0后，便可以进行下一步了
// 然后就可以把业务逻辑放到init的初始化文件中
