import login from './login';

// http基础配置
module.exports = {
	defaults: {
		// baseURL: 'http://127.0.0.1',
	},
	requestInterceptors: [function(res) {
		console.debug('request:', res);

		// 是否显示加载条
		// res.showLoading = true;
		if (res.showLoading) {
			const showLoadingText = typeof res.showLoading === 'string' ? res.showLoading : '请稍后...';
			wx.showLoading({
				title: showLoadingText,
				mask: true,
			});
		}

		// 附加用户session_id
		const globalData = getApp().globalData;
		if (!globalData.sessionId) {
			globalData.sessionId = wx.getStorageSync('session_id');
		}
		if (!res.data) res.data = {};
		res.data.session_id = globalData.sessionId;

		return res;
	},],
	responseInterceptors: [{
		fulfilled: function(res) {
			// 关闭loading
			if (res.config.showLoading) {
				wx.hideLoading();
			}

			// 显示500错误
			if (res.statusCode !== 200) {
				if (res.config.isShowErrorTips !== false) {
					wx.showToast({
						title: '网络错误，请稍后~',
						icon: 'none',
					});
				}
				return Promise.reject(res);
			}

			// 业务错误提示
			if (res.data.code !== 1) {

				// 登录失效
				if (res.data.code === -1) {
					if (res.config.loginCount === 1) {
						wx.showModal({
							title: '温馨提示',
							content: '登录超时，请稍后再试~',
							showCancel: false
						});
						return Promise.reject({
							message: '登录超时,请稍后再试~',
							login_timeout: true
						});
					}
					res.config.loginCount = 1;
					return login(res.config);
				}

				// 余额不足
				if (res.data.code === -3) {
					wx.showModal({
						title: '温馨提示',
						content: '你的当前星币不足，是否查看获取星币的方法？',
						showCancel: true,
						confirmColor: '#2E8B57',
						confirmText: '了解一下',
						success: (res) => {
							if (res.cancel) return;

							wx.navigateTo({
								url: '/pages/user/gold/index'
							});
						}
					});
					return Promise.reject(res);
				}

				if (res.config.isShowErrorTips !== false) {
					if (res.data.show_msg_type === 1) {
						wx.showModal({
							content: res.data.msg || '网络错误，请稍后~',
							showCancel: false
						});
					} else {
						wx.showToast({
							title: res.data.msg || '网络错误，请稍后~',
							icon: 'none',
						});
					}
				}

				return Promise.reject(res);
			}

			// // 返回简要信息
			// if (res.config.simpleData !== false) {
			// 	return res.data;
			// }

			return res;
		},
		rejected: function(res) {
			// 关闭loading
			if (res.config.showLoading) {
				wx.hideLoading();
			}
			if (res.config.isShowErrorTips !== false) {
				wx.showToast({
					title: '网络错误，请稍后~',
					icon: 'none',
				});
			}

			return Promise.reject(res);
		}
	}]
};
