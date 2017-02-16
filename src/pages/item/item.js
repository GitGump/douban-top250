// pages/item/item.js
var app = getApp();

Page({
  data:{
    title: '',
    id: '',
    movie: {},
    isLoading: false,
    itemStr: app.str.item,
    commonStr: app.str.common
  },

  loadMovie: function(id) {
    var that = this;
    app.douban.findMovieById(id, function(res) {
      wx.setNavigationBarTitle({
        title: res.data.title
      });
      that.setData({
        isLoading: false,
        movie: res.data
      });
      // that.data.title = res.data.title;
    }, function(e) {
      that.setData({
        isLoading: false
      });
      console.error("Error occurs as fetching data, see more info: ");
      console.dir(e);
    });
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    if (!options) {
      console.error("Oooops! Something is wrong!");
      return;
    }

    this.data.id = options.id;
    this.setData({
      isLoading: true
    });
    this.loadMovie(this.data.id);
  },

  onPulldownRefresh: function() {
    if (this.data.isLoading) {
      wx.stopPulldownRefresh();
    } else {
      this.loadMovie(this.data.id);
    }
  },

  onReady:function(){
    // 页面渲染完成
  },

  onShow:function(){
    // 页面显示
    // var that = this;
    // wx.setNavigationBarTitle({
    //   title: that.data.title
    // });
  },

  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭
  }
})