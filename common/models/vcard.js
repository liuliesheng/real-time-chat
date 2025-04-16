export default {
	// 获取名片列表
	getVCardList(query, options) {
		return uni.$http.get('/plugin/vcard/index/detail', query, options);
	},

	// 获取名片详情
	getVCardDetail(id, options) {
		return uni.$http.get('/plugin/vcard/index/detail', {
			id: id
		}, options);
	},

	// 收藏名片
	favoriteVCard(id, options) {
		return uni.$http.get('/plugin/vcard/favorite/favorite', {
			topic_id: id
		}, options);
	},

	// 取消收藏名片
	unfavoriteVCard(id, options) {
		return uni.$http.get('/plugin/vcard/favorite/unfavorite', {
			topic_id: id
		}, options);
	},

	// 点赞名片
	like(id, options) {
		return uni.$http.get('/plugin/vcard/like/like', {
			topic_id: id
		}, options);
	},

	// 获取动态列表
	getDynamicList(id, query = {}, options = {}) {
		query.vcard_id = id;
		return uni.$http.get('/plugin/vcard/dynamic', query, options);
	},

	// 获取自己名片信息
	getSelfVCard(options) {
		return uni.$http.get('/plugin/vcard/self', null, options);
	},

	// 创建自己名片信息
	saveVCard(data, options) {
		return uni.$http.post('/plugin/vcard/self/save', data, options);
	},

	// 更新自己名片信息
	updateVCard(data, options) {
		return uni.$http.post('/plugin/vcard/self/update', data, options);
	},

	// 生成自己名片二维码
	makeVCardWeappQrcode(options) {
		return uni.$http.post('/plugin/vcard/self/makeweappqrcode', null, options);
	},

	// 获取名片浏览记录
	getBrowseUserList(query, options) {
		return uni.$http.get('/plugin/vcard/index/browseuserlist', query, options);
	}
};
