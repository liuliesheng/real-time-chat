export default {
	// 获取收藏地址
	lists(type, query, options = {}) {
		query.type = type;
		return uni.$http.get('favorite', query, options);
	},

	// 收藏
	favorite(type, topicId, options = {}) {
		return uni.$http.post('favorite/favorite', {
			type: type,
			topic_id: topicId,
		}, options);
	},

	// 取消收藏
	unfavorite(type, topicId, options = {}) {
		return uni.$http.post('favorite/unfavorite', {
			type: type,
			topic_id: topicId
		}, options);
	},
}
