export default {
	// 获取用户详情信息
	get(options = {}) {
		return uni.$http.get('user/info', null, options).then(res => {
			const globalData = getApp().globalData;
			globalData.userInfo = res;
			uni.setStorageSync('userInfo', globalData.userInfo);

			return res;
		});
	},

	// 更新用户信息
	update(data, options = {}) {
		return uni.$http.post('user/update', data, options);
	},

	// 同步微信用户信息
	syncWechat(options = {}) {
		return new Promise((resolve, reject) => {
			const syncTime = uni.getStorageSync('sync_user_info_time') || null;
			if (!options.force && !syncTime) {
				resolve({
					errMsg: 'ok'
				});
			} else {
				uni.$getUserInfo({
					force: true
				}).then((res) => {
					return this.update({
						avatar: res.avatarUrl,
						nickname: res.nickName,
						gender: res.gender,
						language: res.language,
						province: res.province,
						city: res.city,
					}, options);
				}).then(() => resolve({
					errMsg: 'ok'
				}), reject);
			}
		});
	},

	// 获取认证信息
	getIdentityInfo(options = {}) {
		return uni.$http.get('user.identity', null, options);
	},

	// 申请认证
	applyIdentity(data, options = {}) {
		return uni.$http.post('user.identity/apply', data, options);
	},


	// 获取提现记录地址
	getCashoutList(query, options = {}) {
		return uni.$http.get('user.cashout', query, options);
	},

	// 获取提现记录详情
	getCashoutDetail(id, options = {}) {
		return uni.$http.get('user.cashout/detail', {
			id: id
		}, options);
	},

	// 获取提现数据
	getCashoutInfo(query, options = {}) {
		return uni.$http.get('user.cashout/getApplyInfo', query, options);
	},

	// 申请提现
	applyCashout(data, options = {}) {
		return uni.$http.post('user.cashout/apply', data, options);
	},

	// 申请合伙人
	applyVip(data, options = {}) {
		return uni.$http.post('user.vip/apply', data, options);
	},

	// 获取申请合伙人信息
	getApplyVipInfo(data, options = {}) {
		return uni.$http.get('user.vip/getinfo', data, options);
	}
}
