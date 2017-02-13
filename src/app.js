'use strict';

var douban = require('./utils/douban.js');

App({
	data: {
		name: 'Douban Movie Top250',
		version: '0.0.1',
		type: {
			in_theatres: 'in_theatres',
			coming_soon: 'coming_soon',
			top250: 'top250'
		}
	},

	douban: douban,

  onLaunch: function() {

  }
});
