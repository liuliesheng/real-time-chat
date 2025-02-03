import $ from "../../$";
import {emitter} from "../../events";

/**
 * 获取用户信息
 * @param {*} options
 */
$.$define('getUserInfo', function(options = {}) {
	return $.$promise.getUserInfo(Object.assign({
		lang: 'zh_CN'
	})).then(function(res) {
		return options.full ? res : res.userInfo;
	}, function(err) {
		console.error('getUserInfo', err);

		return new Promise(function(resolve, reject) {
			emitter.once('sys.getUserInfo.result', (res) => {
				if (res && res.userInfo) {
					resolve(options.full ? res : res.userInfo);
				} else {
					reject({
						errMsg: '授权失败!',
						isAuthDeny: true
					});
				}
			});
			emitter.emit('sys.getUserInfo.to', options);
		});
	});
});
