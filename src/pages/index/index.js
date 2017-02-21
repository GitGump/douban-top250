'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
	// 页面初始数据
	data: {
		movies: [],
		page: 1,
		count: 15,
		hasMore: true,
		isPageLoading: true, // 页面加载flag
		isDataLoading: false, // 数据记载flag
		success: true,
		indexStr: app.str.index, // 引入电影列表页文本
		commonStr: app.str.common // 引入共用文本
	},

	// 生命周期函数，监听页面加载
	onLoad: function() {
		// this指向页面全局变量空间
		var that = this;
		
		var startIndex = (that.data.page - 1) * that.data.count + 1;
		var endIndex = that.data.page * that.data.count;
		
		// 这里直接使用赋值也可以使得页面上的数据修改，可能是因为小程序初始化之后直接触发这个页面的加载
		// 在其他的子页面必须调用setData()才能生效
		that.data.isPageLoading = true;

		app.douban.findMovieByType(app.data.type.top250, that.data.page, that.data.count, function(res) {
			
			// 此作用域中的this只作用于该回调函数，所以需要改名that引用页面的变量空间
			// 必须调用setData()来修改页面绑定的数据，直接赋值修改变量数值，但页面上的引用不会同步
			that.setData({
				movies: res.data.subjects,
				page: ++that.data.page,
				isPageLoading: false,
				success: true
			});

			console.warn("Got No. from " + startIndex + " to " + endIndex + " movies, they are: ");
			console.dir(res.data.subjects);
			console.warn("So far we've got " + endIndex + " movies totally!");
		}, function(e) {
			that.setData({
				isPageLoading: false,
				success: false
			});
			console.error("Error occurs as fetching data, see more info: ");
			console.dir(e);
		});
	},

	loadMore: function() {
		var that = this;
		var startIndex = (that.data.page - 1) * that.data.count + 1;
		var endIndex = that.data.page * that.data.count;
		that.setData({
			isDataLoading: true
		});
		app.douban.findMovieByType(app.data.type.top250, that.data.page, that.data.count, function(res) {
			that.setData({
				isDataLoading: false
			});

			if (!res.data.subjects.length) {
				that.setData({
					hasMore: false
				});
				console.warn("No more data!");
				return;
			}
			var movies = that.data.movies.concat(res.data.subjects);
			that.setData({
				movies: movies,
				page: ++that.data.page
			});
			console.warn("Got No. form " + startIndex + " to " + endIndex + " movies, they are: ");
			console.dir(res.data.subjects);
			console.warn("So far we've got " + endIndex + " movies totally!");
		}, function(res) {
			that.setData({
				isDataLoading: false
			});

			console.error("Error occurs as fetching data!")
		});
	},

	// 页面相关事件处理函数，监听滑动触底动作
	onReachBottom: function() {
		if (this.data.hasMore) {
			this.loadMore();
		} else {
			console.error("Stop pulling! Top250 is all!");
			return;
		}
	},

	// 页面相关事件处理函数，监听下拉动作
	onPullDownRefresh: function() {
		return;
		if (this.data.hasMore) {
			this.loadMore();
		} else {
			wx.stopPullDownRefresh();
		}
	},

	errorHandle: function() {
		this.onLoad();
	}
});
