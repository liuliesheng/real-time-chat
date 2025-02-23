export default {
	getVCardDetail(id, options) {
		return uni.$http.get('/plugin/vcard/index/detail', {
			id: id
		}, options);
	},

	favoriteVCard(id, options) {
		return uni.$http.get('/plugin/vcard/favorite/favorite', {
			topic_id: id
		}, options);
	},

	unfavoriteVCard(id, options) {
		return uni.$http.get('/plugin/vcard/favorite/unfavorite', {
			topic_id: id
		}, options);
	},

	getDynamicList(id, query = {}, options = {}) {
		query.vcard_id = id;
		return uni.$http.get('/plugin/vcard/dynamic', query, options);
	},

	getSelfVCard(options) {
		return uni.$http.get('/plugin/vcard/self', null, options);
	},

	saveVCard(data, options) {
		return uni.$http.post('/plugin/vcard/self/save', data, options);
	},

	updateVCard(data, options) {
		return uni.$http.post('/plugin/vcard/self/update', data, options);
	},
	
	makeVCardWeappQrcode(options){
		return uni.$http.post('/plugin/vcard/self/makeweappqrcode', null, options);
	},
};
