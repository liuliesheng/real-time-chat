import $ from "../../../bootstrap/$";

/**
 * 是否登录中...
 * @type {Promise}
 */
let loginPromise = null;

/**
 * 最后登录时间
 * @type {number}
 */
let lastTime = 0;

/**
 * 最后登录失败原因
 * @type {*}
 */
let lastError = null;

export default function(options) {
	// 如果请求时间小于登录时间周期，则直接复用最近一次登录结果
	if (options.requestTime < lastTime) {
		// 如果存在失败原因，则认为失败结果
		if (lastError) {
			return Promise.reject(lastError);
		}

		return Promise.resolve();
	}


	if (!loginPromise) {
		$.showNavigationBarLoading();
		loginPromise = $.$http.defaults.login().then((res) => {
			complete();

			$.hideLoading();
			$.hideNavigationBarLoading();

			const app = getApp();
			app.globalData.userInfo = res.data;
			app.globalData.sessionId = res.session_id;
			$.setStorageSync('session_id', res.session_id);
		}, (err) => {
			complete(err);

			$.hideLoading();
			$.hideNavigationBarLoading();

			if (err.isAuthDeny) {
				$.hintError(
					$.$http.defaults.loginFailedMsg
				)
			} else {
				$.hintError(
					$.$http.defaults.loginFailedMsg
				);
			}

			// #ifdef MP-WEIXIN
			wx.getLogManager().warn('user login fail', err);
			// #endif

			return Promise.reject(err);
		});
	}

	return loginPromise.then(function() {
		return options;
	}, function(err) {
		err.config = options;
		return Promise.reject(err);
	});
}

// 登录完成
function complete(err) {
	lastError = err;
	lastTime = new Date().getTime();

	setTimeout(function() {
		loginPromise = null;
	}, 100);
}
