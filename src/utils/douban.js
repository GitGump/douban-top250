'use strict';

// 新版豆瓣电影API地址
var douban_uri = 'https://api.douban.com/v2/movie';

// 指定获取特定类型的一组电影数据，类型包括‘正在热映’、‘即将上映’、‘TOP250’
function findMovieByType(type, page, count, successCB, failCB) {
	if (!type) {
		type = '';
	}

	var params = {
		start: (page - 1) * count,
		count: count
	}

	wx.request({
		url: douban_uri + '/' + type,
		data: params,
		header: {
			'Content-type': 'json'
		},
		success: successCB,
		fail: failCB
	});
}

// 获取指定ID的电影数据
function findMovieById(id, successCB, failCB) {
	wx.request({
		url: douban_uri + '/subject/' + id,
		header: {
			'Content-type' : 'json'
		},
		success: successCB,
		fail: failCB
	});
}

// 将接口暴露给微信小程序
module.exports = {
	findMovieByType: findMovieByType,
	findMovieById: findMovieById,
	douban_uri: douban_uri
}
