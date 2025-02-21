export default {
	// 获取用户详情信息
	get(options) {
		return uni.$http.get('user/info', null, options);
	},

	// 更新用户信息
	update(data, options) {
		return uni.$http.post('user/update', data, options);
	},

	// 同步微信用户信息
	syncWechat(options) {
		return uni.$getUserInfo().then((res) => {
			return this.update({
				avatar: res.avatarUrl,
				nickname: res.nickName,
				gender: res.gender,
				language: res.language,
				province: res.province,
				city: res.city,
			}, options);
		});
	},

	// 获取认证信息
	getIdentityInfo(options) {
		return uni.$http.get('user.identity', null, options);
	},

	// 申请认证
	applyIdentity(data, options) {
		return uni.$http.post('user.identity/apply', data, options);
	},


	// 获取提现记录地址
	getCashoutLists(query, options = {}) {
		return uni.$http.get('user.cashout', query, options);
	},

	// 获取提现记录详情
	getCashoutDetail(id, options = {}) {
		return uni.$http.get('user.cashout/detail', {
			id: id
		}, options);
	},

	// 申请提现
	applyCashout(data, options = {}) {
		return uni.$http.post('user.cashout/apply', data, options);
	},
}
