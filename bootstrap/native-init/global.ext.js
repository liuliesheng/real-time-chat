import {emitter} from "../events";
import {collectionUtil, random} from "../util/index";

// 获取全局对象
const $ = (() => {
	if (typeof wx !== 'undefined') {
		return wx;
	} else if (typeof my !== 'undefined') {
		return my;
	} else if (typeof swan !== 'undefined') {
		return swan;
	}
	throw new Error('未适配的客户端，请手动在此处理');
})();


// 对全局对象添加新属性
Object.defineProperty($, '$define', {
	enumerable: true,
	get: function() {
		return function(obj, key, value, isEnumerable = true) {
			Object.defineProperty(obj, key, {
				enumerable: isEnumerable,
				get: function() {
					return value;
				}
			});
		};
	}
});

// 增加wx对象添加新属性
$.$define($, 'define', function(key, value, isEnumerable = true) {
	return $.$define($, key, value, isEnumerable);
});

// 增加对微信原始API支持promise
$.define('promise', new Proxy($, {
	get: function(target, key, receiver) {
		const wxFunc = Reflect.get(target, key, receiver);
		return function(options) {
			return new Promise(function(resolve, reject) {
				wxFunc(Object.assign(options || {}, {
					success: resolve,
					fail: reject
				}));
			});
		}
	}
}));

// 系统信息
const systemInfo = $.getSystemInfoSync();
$.define('systemInfo', systemInfo);
$.define('isDev', systemInfo.platform === 'devtools');

// 扁平化支付宝接口
if (typeof my !== undefined) {
	(function() {
		// ui相关
		$.define('showModal', function(options) {
			if (options.showCancel === false) {
				my.alert(options);
			} else {
				my.confirm(options);
			}
		});

		// 缓存相关
		const getStorageSync = my.getStorageSync;
		$.define('getStorageSync', function(key) {
			return getStorageSync({key: key}).data;
		});

		const setStorageSync = my.setStorageSync;
		$.define('setStorageSync', function(key, data) {
			return setStorageSync({key: key, data: data});
		});

		const removeStorageSync = my.removeStorageSync;
		$.define('removeStorageSync', function(key) {
			return removeStorageSync({key: key});
		});

		// 用户相关
		$.define('login', function(options) {
			my.getAuthCode({
				scopes: 'auth_base',
				success: (res) => {
					options.success && options.success({
						code: res.authCode
					});
				},
				fail: options.fail,
				complete: options.complete
			});
		});

		// 用户信息
		$.define('getUserInfo', function(options) {
			my.getOpenUserInfo({
				success: (res) => {
					let userInfo = null;
					try {
						userInfo = JSON.parse(res.response).response;
					} catch (e) {
						console.warn(e);
						options.fail && options.fail(e);
					}

					if (userInfo) {
						options.success && options.success({
							userInfo: {
								nickName: userInfo.nickName,
								avatarUrl: userInfo.avatar,
								gender: userInfo.gender,
								countryCode: userInfo.countryCode,
								province: userInfo.province,
								city: userInfo.city,
								language: 'zh_CN',
							},
							rawData: res.response
						});
					}
				},
				fail: options.fail,
				complete: options.complete
			});
		});

	})();
}

/**
 * 授权是否被拒绝
 * @param {*} res
 * @return {boolean}
 */
$.define('isAuthDeny', function(err) {
	if (!err || !err.errMsg) return false;
	return err.errMsg.indexOf('fail auth deny') !== -1;
});

/**
 * 当前页面是否正在显示
 * @param {*} pageObj
 * @return {boolean}
 */
$.define('isShowPage', function(pageObj) {
	return getCurrentPages()[0].route === pageObj.route;
});

// QQ地图
$.define('getQQMap', (function() {
	const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');

	/**
	 * QQ地图key列表
	 * @type {string[]}
	 */
	let qqMapKeys = [
		'XUKBZ-6V23F-4A3JU-NBO5F-E7FQ7-5CFR7',
		'PO6BZ-MXAKD-EM74T-HC5OK-E5KV6-A6FKG',
		'5AMBZ-H6BR3-IC53J-3532N-7LDEQ-OBBIT',
	];

	/**
	 * 获取腾讯地图实例
	 * @return {QQMapWX}
	 */
	return function() {
		if (random(1, 3) === 2) {
			qqMapKeys = collectionUtil.shuffle(qqMapKeys); //打乱数组
		}
		const index = random(0, qqMapKeys.length - 1);

		// 实例化API核心类
		return new QQMapWX({
			key: qqMapKeys[index]
		});
	};
})());

// 数组转对象
$.define('arr2obj', function(prefix, data, initIndex = 0) {
	const result = {};
	for (let i = 0; i < data.length; i++) {
		const newKey = prefix + '[' + (i + initIndex) + ']';
		result[newKey] = data[i];
	}
	return result;
});

// 系统相关方法的扩展
$.define('sys', (function(sys = {}) {

	/**
	 * 调用并授权地理位置权限
	 * @param {string} invokeFunc
	 * @param {*} options
	 */
	function invokeLocationAndAuth(invokeFunc, options) {
		return $.promise[invokeFunc](options).catch(function(err) {
			err.isAuthDeny = $.isAuthDeny(err);
			if (!err.isAuthDeny) return Promise.reject(err);

			return $.promise.openSetting({}).then(function(res) {
				if (!res.authSetting['scope.userLocation']) {
					return Promise.reject(err);
				}

				return $.promise.showModal({
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
		return $.promise.getUserInfo(Object.assign({
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
				emitter.trigger('sys.getUserInfo.to', options);
			});
		});
	};

	return sys;
})());

export default $;
