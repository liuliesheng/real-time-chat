import $ from "../../$";

export default function(options = {}) {
	if (!$.$http.config.weappLoginUrl) {
		return Promise.reject({
			errMsg: 'common/config/http.js not configure `weappLoginUrl` !'
		});
	}

	return $.$promise.login({}).then((res) => {
		delete res.errMsg;
		const code = res.code;

		if ((options.loginUserInfo === undefined && $.$http.config.loginUserInfo) || options.loginUserInfo) {
			return $.$getUserInfo({
				withCredentials: true,
				desc: $.$http.config.loginAuthTips
			}).then((user) => {
				delete res.errMsg;
				user.code = res.code;
				return user;
			});
		}

		return res;
	}).then((res) => {
		// 组装数据
		const globalData = getApp().globalData;
		res.share_uid = globalData.shareUid || 0;
		res.fenxiao_uid = globalData.fenxiaoUid || 0;

		return new Promise((resolve, reject) => {
			$.request({
				url: $.$http.config.weappLoginUrl,
				method: 'POST',
				data: res,
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
						resolve(res);
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
