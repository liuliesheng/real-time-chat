import $ from "../../$";

export default function(options = {}) {
	const app = getApp();
	let code = null;

	return $.$promise.login({}).then((res) => {
		code = res.code;

		if ($.$http.defaults.loginUserInfo || (options.loginUserInfo !== undefined && options.loginUserInfo)) {
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
							// errMsg: '登录失败，请稍后再试~',
							response: response
						});
					}

					let res = response.data;
					if (res.code === 1) {
						resolve(res);

						if ($.$http.defaults.onLogged) {
							$.$http.defaults.onLogged(res);
						}
					} else {
						reject({
							code: res.code,
							errMsg: res.msg,
							data: res
						});
					}
				},
				fail: reject,
			});
		});
	});
}
