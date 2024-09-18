import login from "./login";

export default {
	fulfilled: function(res) {
		// 关闭loading
		if (res.config.showLoading) {
			uni.hideLoading();
		}

		// 显示500错误
		if (res.statusCode !== 200) {
			if (res.config.isShowErrorTips !== false) {
				uni.showToast({
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
					uni.showModal({
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
				return login(res.config).then(options => uni.http.request(options));
			}

			// 暂无权限
			if (res.data.code === -10) {
				uni.showModal({
					title: '温馨提示',
					content: '暂无权限，详细请查看权限说明？',
					showCancel: true,
					confirmColor: '#2E8B57',
					confirmText: '了解一下',
					success: (res) => {
						if (res.cancel) return;

						uni.navigateTo({
							url: '/pages/user/auth-info'
						});
					}
				});

				return Promise.reject(res);
			}

			// 其他错误处理
			if (res.config.isShowErrorTips !== false) {
				if (res.data.show_msg_type === 1) {
					uni.showModal({
						content: res.data.msg || '网络错误，请稍后~',
						showCancel: false
					});
				} else {
					uni.showToast({
						title: res.data.msg || '网络错误，请稍后~',
						icon: 'none',
					});
				}
			}

			return Promise.reject(res);
		}

		// 是否强制提示信息
		if (res.data.is_force_tips) {
			const method = res.is_force_tips === true ? 'modal' : res.is_force_tips;
			if (res.is_force_tips === 'toast') {
				uni.showToast({
					title: res.data.msg,
					icon: 'none',
				});
			} else {
				uni.showModal({
					content: res.data.msg,
					showCancel: false
				});
			}

			ui[method](info || res.forceTipMsg);
		}

		return res;
	},
	rejected: function(err) {
		// 关闭loading
		if (err.config.showLoading) {
			uni.hideLoading();
		}

		if (err.config.isShowErrorTips !== false) {
			uni.showToast({
				title: err.errMsg || '网络错误，请稍后~',
				icon: 'none',
			});
		}

		return Promise.reject(err);
	}
};
