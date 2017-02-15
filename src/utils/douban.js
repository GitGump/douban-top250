'use strict';

var douban_uri = 'https://api.douban.com/v2/movie';

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

module.exports = {
	findMovieByType: findMovieByType,
	findMovieById: findMovieById,
	douban_uri: douban_uri
}
