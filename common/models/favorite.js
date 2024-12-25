export default {
	// 获取收藏地址
	lists(type, query, options = {}) {
		query.type = type;
		return uni.$http.get('favorite', query, options);
	},

	// 收藏
	favorite(type, id, options = {}) {
		return uni.$http.get('favorite/create', {
			id: id
		}, options);
	},

	// 取消收藏
	unfavorite(type, data, options = {}) {
		return uni.$http.post('favorite/delete', data, options);
	},
}
