var str = {

	// 公共文本
	common: {
		loading: "加载中...",
		noMoreData: "没有更多数据了:)",
		movieType: {
			inTheatres: "正在热映",
			comingSoon: "即将上映",
			top250: "Top 250"
		},
		movie: {
			director: "导演：",
			casts: "主演：",
			year: "上映年份：",
			rating: "评分：",
			content: "剧情简介："
		},
		error: {
			common: "轻触屏幕重新加载",
			network: "网络连接不可用，请稍后重试"
		}
	},

	// 电影列表页文本
	index: {
		movie: {
			collect_count: "人评价"
		}
	},

	// 电影详情页文本
	item: {
		movie: {
			director: "导演"
		}
	}
}

// 将接口暴露给微信小程序
module.exports = {
	str: str,
	common: str.common,
	index: str.index,
	item: str.item
}