export default {
	// 获取用户详情信息
	get(options) {
		return uni.$http.get('user/info', null, options);
	},

	// 更新用户信息
	update(data, options) {
		return uni.$http.post('user/update', data, options);
	},

	// 获取认证信息
	getIdentityInfo(options) {
		return uni.$http.get('user_identity', null, options);
	},

	// 申请认证
	applyIdentity(data, options) {
		return uni.$http.post('user_identity', data, options);
	},


	// 获取提现记录地址
	getCashoutLists(query, options = {}) {
		return uni.$http.get('user_cashout', query, options);
	},

	// 获取提现记录详情
	getCashoutDetail(id, options = {}) {
		return uni.$http.get('user_cashout/detail', {
			id: id
		}, options);
	},

	// 申请提现
	applyCashout(data, options = {}) {
		return uni.$http.post('user_cashout/apply', data, options);
	},
}
