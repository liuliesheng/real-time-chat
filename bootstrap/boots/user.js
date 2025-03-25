import $ from "../$";
import observer from '../observer';

// 注入获取登录标识
(function() {
	let globalSessionId = $.getStorageSync($.$config.sessionIdKey);

	$.$define('getSessionId', function() {
		return globalSessionId;
	});

	$.$define('setSessionId', function(sessionId) {
		console.info('new session_id:', sessionId);

		globalSessionId = sessionId;
		$.setStorageSync($.$config.sessionIdKey, globalSessionId);
	});
})();

// 注入用户信息
(function() {
	const globalUserInfo = observer('user');

	const userInfo = $.getStorageSync($.$config.userInfoKey);
	if (userInfo) {
		globalUserInfo._value = userInfo;
	}

	globalUserInfo.subscribe(function(user) {
		console.info('new user:', user);

		$.setStorageSync($.$config.userInfoKey, user);
	});

	globalUserInfo.subscribe($.$config.onUserChange);

	$.$define('user', globalUserInfo);
})();

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

// 注入登录器
$.$define('login', function(options) {
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
		loginPromise = $.$http.config.login(options).then((res) => {
			console.log("login success:", res);

			$.hideLoading();
			$.hideNavigationBarLoading();

			$.$user.notify(res.data);
			$.$setSessionId(res.session_id);

			// 触发登录事件
			setTimeout(() => {
				$.$config.onLogged(res.data);
			}, 0);

			complete(res);

			return options;
		}, (err) => {
			$.hideLoading();
			$.hideNavigationBarLoading();

			if (err.isAuthDeny) {
				$.$hintError($.$http.config.loginAuthFailedTips)
			} else {
				const data = err.data;
				const errMsg = err.errMsg || $.$http.config.loginFailedMsg;
				if (data && data.tips_type === 'alert') {
					$.showModal({content: errMsg, showCancel: false});
				} else {
					$.$hintError(errMsg);
				}
			}

			// #ifdef MP-WEIXIN
			wx.getLogManager().warn('user login fail', err);
			// #endif

			complete(err);

			return Promise.reject(err);
		});
	}

	return loginPromise.then(function() {
		return options;
	}, function(err) {
		err.config = options;
		return Promise.reject(err);
	});
});

// 登录完成
function complete(err) {
	lastError = err;
	lastTime = Math.floor(new Date().getTime() / 1000);

	setTimeout(function() {
		loginPromise = null;
	}, 100);
}

// 注入智能检测登录器
$.$define('logged', function(options) {
	const userInfo = $.$user.value();
	if (userInfo) {
		return Promise.resolve(userInfo);
	}

	return $.$login(options);
});

// 注入用户是否已登录
$.$define('isLogged', function(options) {
	const userInfo = $.$user.value();
	return !!userInfo;
});
