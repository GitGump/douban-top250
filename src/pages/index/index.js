'use strict';

var app = getApp();

Page({
	data: {
		movies: [],
		page: 1,
		count: 15,
		hasMore: true,
		isLoading: "false",
		indexStr: app.str.index,
		commonStr: app.str.common
	},

	onLoad: function() {
		var that = this;
		var startIndex = (that.data.page - 1) * that.data.count + 1;
		var endIndex = that.data.page * that.data.count;
		that.data.isLoading = true;
		app.douban.findMovieByType(app.data.type.top250, that.data.page, that.data.count, function(res) {
			that.setData({
				movies: res.data.subjects,
				page: ++that.data.page,
				isLoading: false
			});
			console.warn("Got No. from " + startIndex + " to " + endIndex + " movies, they are: ");
			console.dir(res.data.subjects);
			console.warn("So far we've got " + endIndex + " movies totally!");
		}, function(e) {
			that.setData({
				isLoading: false
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
		app.douban.findMovieByType(app.data.type.top250, that.data.page, that.data.count, function(res) {
			that.setData({
				isLoading: false
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
				isLoading: false
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
