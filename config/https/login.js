import $ from '../../bootstrap/$';

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
			item.resolve(item.options);
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
	const app = getApp();
	let code = null;

	return $.$promise.login({}).then((res) => {
		code = res.code;
		if ($.$http.defaults.loginUserInfo) {
			return $.$getUserInfo({
				withCredentials: true
			});
		}
		return {};
	}).then((res) => {
		delete res.errMsg;

		// 组装数据
		res.code = code;
		res.share_uid = app.globalData.shareUid;

		if (!$.$http.defaults.loginUrl) {
			return Promise.reject({
				errMsg: 'config/http.js not configure `defaults.loginUrl` !'
			});
		}

		return new Promise((resolve, reject) => {
			$.request({
				url: $.$http.defaults.loginUrl,
				method: 'POST',
				data: res,
				dataType: 'json',
				success: (response) => {
					if (response.statusCode !== 200) {
						reject({
							code: response.statusCode,
							errMsg: '登录失败，请稍后再试~',
							response: response
						});
					}

					res = response.data;
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
export default function (options) {
	return new Promise((resolve, reject) => {
		callbacks.push({
			options: options,
			resolve: resolve,
			reject: reject,
		});
		if (isLoading) return;

		isLoading = true;
		$.showNavigationBarLoading();
		loginServer().then((res) => {
			$.hideLoading();
			$.hideNavigationBarLoading();
			isLoading = false;

			const app = getApp();
			app.globalData.userInfo = res.data;
			app.globalData.sessionId = res.session_id;
			$.setStorageSync('session_id', res.session_id);

			execCallbacks('resolve');
		}, (err) => {
			$.hideLoading();
			$.hideNavigationBarLoading();
			isLoading = false;

			if (err.isAuthDeny) {
				$.hintError('请先授权！')
			} else {
				$.showModal({
					content: '登录失败，请稍后再试~',
					showCancel: false
				});
			}

			// #ifdef MP-WEIXIN
			wx.getLogManager().warn('user login fail', err);
			// #endif

			execCallbacks('reject', err);
		});
	});
};