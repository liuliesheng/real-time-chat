import $ from "../../../$";
import {emitter} from "../../../events";

// 系统信息
const systemInfo = $.getSystemInfoSync();
$.$define('systemInfo', systemInfo);
$.$define('isDev', systemInfo.platform === 'devtools');

// 系统相关方法的扩展
$.$define('sys', (function(sys = {}) {

	/**
	 * 调用并授权地理位置权限
	 * @param {string} invokeFunc
	 * @param {*} options
	 */
	function invokeLocationAndAuth(invokeFunc, options) {
		return $.$promise[invokeFunc](options).catch(function(err) {
			err.isAuthDeny = $.isAuthDeny(err);
			if (!err.isAuthDeny) return Promise.reject(err);

			return $.$promise.openSetting({}).then(function(res) {
				if (!res.authSetting['scope.userLocation']) {
					return Promise.reject(err);
				}

				return $.$promise.showModal({
					title: '温馨提示',
					content: '此操作需要你的授权，我们不会泄露你的隐私！',
					showCancel: false,
				}).then(function() {
					return new Promise(function(resolve, reject) {
						$[invokeFunc](Object.assign(options, {
							success: resolve,
							fail: function(err) {
								err.isAuthDeny = $.isAuthDeny(err);
								reject(err);
							}
						}));
					});
				});
			});
		});
	}

	/**
	 * 获取当前位置信息
	 * @param {*} options
	 * @return Promise<*>
	 */
	sys.getLocation = function(options) {
		return invokeLocationAndAuth(options, 'getLocation');
	};

	/**
	 * 打开地图
	 * @param {*} options
	 * @return Promise<*>
	 */
	sys.openLocation = function(options) {
		return invokeLocationAndAuth(options, 'openLocation');
	};

	/**
	 * 获取当前位置信息
	 * @param {*} options
	 * @return Promise<*>
	 */
	sys.chooseLocation = function(options) {
		return invokeLocationAndAuth(options, 'chooseLocation');
	};

	/**
	 * 获取用户信息
	 * @param {*} options
	 */
	sys.getUserInfo = function(options = {}) {
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
	};

	return sys;
})());
