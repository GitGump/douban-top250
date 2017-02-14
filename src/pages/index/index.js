'use strict';

var app = getApp();

Page({
	data: {
		movies: [],
		page: 1,
		count: 10,
		hasMore: true,
		noMoreData: "没有更多数据了",
		loadingText: "正在加载中...",
		isLoading: "false",
		movieText: {
			director: "导演：",
			casts: "主演：",
			year: "上映年份：",
			rating: "评分："
		}
	},

	onLoad: function() {
		var that = this;
		var startIndex = (that.data.page - 1) * that.data.count + 1;
		var endIndex = that.data.page * that.data.count;
		that.data.isLoading = true;
		app.douban.find(app.data.type.top250, that.data.page, that.data.count, function(res) {
			that.setData({
				movies: res.data.subjects,
				page: ++that.data.page,
				isLoading: !that.data.isLoading
			});
			console.warn("Got No. from " + startIndex + " to " + endIndex + " movies, they are: ");
			console.dir(res.data.subjects);
			console.warn("So far we've got " + endIndex + " movies totally!");
		}, function(e) {
			that.setData({
				isLoading: !that.data.isLoading
			});
			console.error("Error occues as fetching data, see more info: ");
			console.dir(e);
		});
	},

	loadMore: function() {
		var that = this;
		var startIndex = (that.data.page - 1) * that.data.count + 1;
		var endIndex = that.data.page * that.data.count;
		that.setData({
			isLoading: true
		});
		app.douban.find(app.data.type.top250, that.data.page, that.data.count, function(res) {
			that.setData({
				isLoading: !that.data.isLoading
			});

			if (!res.data.subjects.length) {
				that.data.hasMore = false;
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
				isLoading: !that.data.isLoading
			});

			console.error("Error occurs as fetching data!")
		});
	},

	onReachBottom: function() {
		if (this.data.hasMore) {
			this.loadMore();
		} else {
			console.error("Stop pulling! Top250 is all!");
			return;
		}
	},

	onPullDownRefresh: function() {
		return;
		if (this.data.hasMore) {
			this.loadMore();
		} else {
			wx.stopPullDownRefresh();
		}
	}
});
