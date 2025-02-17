import $ from "../../$";

export default function(options = {}) {
	if (!$.$http.defaults.loginUrl) {
		return Promise.reject({
			errMsg: 'config/http.js not configure `defaults.loginUrl` !'
		});
	}

	const app = getApp();
	return $.$promise.login({}).then((res) => {
		delete res.errMsg;
		const code = res.code;

		if ($.$http.defaults.loginUserInfo || (options.loginUserInfo !== undefined && options.loginUserInfo)) {
			return $.$getUserInfo({
				withCredentials: true
			}).then((user) => {
				delete res.errMsg;
				user.code = res.code;
				return user;
			});
		}

		return res;
	}).then((res) => {
		// 组装数据
		res.share_uid = app.globalData.shareUid;
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
