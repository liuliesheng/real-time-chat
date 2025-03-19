import $ from "../../$";

const LOGIN_INFO_KEY = '__login_info__';

/**
 * 登录
 * @param {*} [options]
 * @return {Promise<*>}
 */
export default function(options) {
	// 静默登录
	if (options.account === undefined || options.password === undefined) {
		options = $.getStorageSync(LOGIN_INFO_KEY);
		if (!options) {
			return fallback();
		} else {
			return connect(options).catch(function(reason) {
				return fallback();
			});
		}
	}

	return connect(options);
}

// 登录服务器
function connect(options) {
	if (!$.$http.config.loginUrl) {
		return Promise.reject({
			errMsg: 'common/config/http.js not configure `loginUrl` !'
		});
	}
	
	return new Promise(function(resolve, reject) {
		$.request({
			url: $.$http.config.loginUrl,
			method: 'POST',
			data: options,
			dataType: 'json',
			success: (response) => {
				if (response.statusCode !== 200) {
					reject({
						code: response.statusCode,
						response: response
					});
				}

				let res = response.data;
				if (res.code === 1) {
					// 存储登录信息
					$.setStorageSync(LOGIN_INFO_KEY, {
						account: options.account,
						password: options.password
					});

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
	}).then(function(res) {
		$.$emitter.emit('sys.login.result', res);
		return res;
	}, function(err) {
		$.$emitter.emit('sys.login.result', err);
		return Promise.reject(err);
	});
}

// 静默登录回退机制
function fallback() {
	return new Promise(function(resolve, reject) {
		$.$emitter.once('sys.login.result', (res) => {
			if (!res.errMsg) {
				resolve(res);
			} else {
				reject(res);
			}
		});
		$.navigateTo({
			url: $.$http.config.loginPage
		})
	});
}
