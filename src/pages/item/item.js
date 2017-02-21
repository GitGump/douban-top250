// pages/item/item.js
'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  // 页面初始数据
  data:{
    title: '',
    options: '',
    id: '',
    movie: {},
    isPageLoading: true, // 页面加载flag
    success: true,
    itemStr: app.str.item, // 引入电影详情页文本
    commonStr: app.str.common // 引入公共文本
  },

  loadMovie: function(id) {
    var that = this;
    app.douban.findMovieById(id, function(res) {
      // TODO: 目前页面标题必须得等到页面数据全部加载完之后才会变过来，用户不友好，后续需要找到一个平滑过渡的办法
      // that.data.title = res.data.title;
      wx.setNavigationBarTitle({
        title: res.data.title
      });

      that.setData({
        isPageLoading: false,
        movie: res.data,
        success: true
      });
    }, function(e) {
      that.setData({
        isPageLoading: false,
        success: false
      });
      console.error("Error occurs as fetching data, see more info: ");
      console.dir(e);
    });
  },

  // 生命周期函数，监听页面加载
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数，由上一页面传进来的电影ID
    this.data.options = options;

    // 子页面中必须使用setData()才能使得数据的修改在页面上生效，直接赋值不行
    this.setData({
      isPageLoading: true,
      success: true
    });

    this.loadMovie(this.data.options.id);
  },

  // 异常处理函数，点击重新加载页面
  errorHandle: function() {
    this.onLoad(this.data.options);
  },

  // 页面相关事件处理函数，监听用户下拉动作
  onPulldownRefresh: function() {
    if (this.data.isLoading) {
      wx.stopPulldownRefresh();
    } else {
      this.loadMovie(this.data.options.id);
    }
  },

  // 生命周期函数，监听页面初次渲染完成
  onReady:function(){
    // 页面渲染完成
  },

  // 生命周期函数，监听页面显示
  onShow:function(){
    // 页面显示
    // TODO: 平滑修改子页面标题
    // var that = this;
    // wx.setNavigationBarTitle({
    //   title: that.data.title
    // });
  },

  // 生命周期函数，监听页面隐藏
  onHide:function(){
    // 页面隐藏
  },

  // 生命周期函数，监听页面卸载
  onUnload:function(){
    // 页面关闭
  }
})