/**
 * 调用登录的回调函数
 * @type {Array}
 */
const callbacks = [];

/**
 * 执行回调函数
 * @param {string} flag
 * @param {*} [err]
 */
function execCallbacks(flag, err) {
	callbacks.forEach(item => {
		if ('resolve' === flag) {
			item.resolve(wx.http.request(item.options));
		} else {
			err.config = item.options;
			item.reject(err);
		}
	});
	callbacks.splice(0, callbacks.length);
}

/**
 * 登录服务器
 * @return {Promise}
 */
function loginServer() {
	let code = null;
	return wx.functionUtil.callbacksTransformPromise(wx.login).then((res) => {
		code = res.code;
		return wx.sys.getUserInfo({
			withCredentials: true
		});
	}).then((res) => {
		delete res.errMsg;

		// 组装数据
		res.code = code;
		const app = getApp();
		res.share_uid = app.globalData.shareUid;

		return new Promise((resolve, reject) => {
			wx.request({
				url: wx.http.defaults.baseURL + '/api/app.login/login',
				method: 'POST',
				data: res,
				dataType: 'json',
				success: (res) => {
					if (res.statusCode !== 200) {
						reject({
							code: res.statusCode,
							errMsg: '登录失败，请稍后再试~',
							response: res.data
						});
					}

					res = res.data;
					if (res.code === 1) {
						resolve(res);
					} else {
						reject({
							code: res.code,
							errMsg: res.msg,
						});
					}
				},
				fail: reject,
			});
		});
	});
}

/**
 * 是否登录中...
 * @type {boolean}
 */
let isLoading = false;
/**
 * login
 * @type {function}
 */
export default function(options) {
	return new Promise((resolve, reject) => {
		callbacks.push({
			options: options,
			resolve: resolve,
			reject: reject,
		});
		if (isLoading) return;

		isLoading = true;
		wx.showNavigationBarLoading();
		loginServer().then((res) => {
			wx.hideLoading();
			wx.hideNavigationBarLoading();
			isLoading = false;

			const app = getApp();
			app.globalData.userInfo = res.data;
			app.globalData.sessionId = res.session_id;
			wx.setStorageSync('session_id', res.session_id);

			execCallbacks('resolve');
		}, (err) => {
			wx.hideLoading();
			wx.hideNavigationBarLoading();
			isLoading = false;

			if (err.isAuthDeny) {
				wx.showToast({title: '请先授权！', icon: 'none'})
			} else {
				wx.showModal({
					content: '登录失败，请稍后再试~',
					showCancel: false
				});
			}
			wx.getLogManager().warn('user login fail', err);

			execCallbacks('reject', err);
		});
	});
};
