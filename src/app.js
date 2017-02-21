'use strict';

// 引入豆瓣API
var douban = require('./utils/douban.js');

// 引入i18n文本文件
var str = require('./utils/str.js');


// 小程序入口
App({

	// 小程序初始数据
	data: {
		name: 'Douban Movie TOP250',
		version: '0.1.0',
		type: {
			in_theatres: 'in_theatres',
			coming_soon: 'coming_soon',
			top250: 'top250'
		}
	},

	// 将豆瓣API注册到小程序全局变量，子页面（Page）中可通过getApp().douban引用
	douban: douban,

	// 将i18n文本文件绑定到小程序全局变量，子页面（Page）中可通过getApp().str引用，再赋值给data即可实现在子页面的数据绑定
	str: str,

	// 生命周期函数，监听小程序初始化
  onLaunch: function() {}
});
