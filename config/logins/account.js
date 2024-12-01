import $ from "../../bootstrap/$";

const LOGIN_INFO_KEY = '__login_info__';

/**
 * 登录
 * @param {*} [options]
 * @return {Promise<*>}
 */
export default function(options) {
	// 静默登录
	if (!options) {
		options = $.getStorageSync(LOGIN_INFO_KEY);
		if (!options) {
			return fallback().then(function(options) {
				return connect(options);
			});
		}
	}

	return connect(options);
}

// 登录服务器
function connect(options) {
	return new Promise(function(resolve, reject) {
		$.request({
			url: $.$http.defaults.loginUrl,
			method: 'POST',
			data: options,
			dataType: 'json',
			success: (response) => {
				if (response.statusCode !== 200) {
					reject({
						code: response.statusCode,
						errMsg: '登录失败，请稍后再试~',
						response: response
					});
				}

				let res = response.data;
				if (res.code === 1) {
					// 存储登录信息
					$.setStorageSync(LOGIN_INFO_KEY, options);

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
			url: $.$http.defaults.loginPage
		})
	});
}
