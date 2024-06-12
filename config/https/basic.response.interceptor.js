import login from "./login";

export default {
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
				return login(res.config).then(options => wx.http.request(options));
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

		return res;
	},
	rejected: function(err) {
		// 关闭loading
		if (err.config.showLoading) {
			wx.hideLoading();
		}

		if (err.config.isShowErrorTips !== false) {
			wx.showToast({
				title: err.errMsg || '网络错误，请稍后~',
				icon: 'none',
			});
		}

		return Promise.reject(err);
	}
};
