import {collectionUtil, random} from "./util/index";
import {emitter} from "./events";

/**
 * 系统方法
 */
const _ = {};
export default _;

// QQ地图
(function() {
	const QQMapWX = require('./qqmap-wx-jssdk.min.js');
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
	_.getQQMap = function() {
		if (random(1, 3) === 2) {
			qqMapKeys = collectionUtil.shuffle(qqMapKeys); //打乱数组
		}
		const index = random(0, qqMapKeys.length - 1);
		return new QQMapWX({key: qqMapKeys[index]});// 实例化API核心类
	};
})();


/**
 * 打开网页
 * @param {String} url
 */
_.openUrl = function(url) {
	wx.navigateTo({
		url: '/pages/common/webview/index?url=' + encodeURIComponent(url),
	});
};

/**
 * 授权是否被拒绝
 * @param {*} res
 * @return {boolean}
 */
_.isAuthDeny = function(res) {
	return res.errMsg.indexOf('fail auth deny') !== -1;
};

/**
 * 获取当前位置信息
 * @param {*} options
 */
_.getLocation = function(options) {
	return _.invokeAndAuthLocation(options, wx.getLocation);
};

/**
 * 打开地图
 * @param {*} options
 */
_.openLocation = function(options) {
	return _.invokeAndAuthLocation(options, wx.openLocation);
};

/**
 * 获取当前位置信息
 * @param {*} options
 */
_.chooseLocation = function(options) {
	return _.invokeAndAuthLocation(options, wx.chooseLocation);
};

/**
 * 调用并授权地理位置权限
 * @param {*} options
 * @param {Function} invokeFunc
 */
_.invokeAndAuthLocation = function(options, invokeFunc) {
	return new Promise((resolve, reject) => {
		invokeFunc(Object.assign(options, {
			success: resolve,
			fail: (err) => {
				err.isAuthDeny = _.isAuthDeny(err);
				if (!err.isAuthDeny) return reject(err);

				wx.openSetting({
					success: res => {
						if (!res.authSetting['scope.userLocation'])
							return reject(err);

						wx.showModal({
							title: '温馨提示',
							content: '此操作需要你的授权，我们不会泄露你的隐私！',
							showCancel: false,
							success: () => {
								invokeFunc(Object.assign(options, {
									success: resolve,
									fail: (err) => {
										err.isAuthDeny = this.isAuthDeny(err);
										reject(err);
									}
								}));
							}
						});
					}
				});
			},
			complete: undefined
		}));
	});
};

/**
 * 当前页面是否正在显示
 * @param {*} pageObj
 * @return {boolean}
 */
_.isShowPage = function(pageObj) {
	return getCurrentPages()[0].route === pageObj.route;
};

/**
 * 获取用户信息
 * @param {*} options
 */
_.getUserInfo = function(options = {}) {
	return new Promise((resolve, reject) => {
		wx.getUserInfo(Object.assign({
			lang: 'zh_CN'
		}, options, {
			success: resolve,
			fail: err => {
				listener.once('wx.userinfo.result', (res) => {
					getApp().globalData.isAuthing = false;
					if (res) {
						resolve(res);
					} else {
						reject({
							errMsg: '授权失败',
							isAuthDeny: true
						});
					}
				});
				listener.trigger('wx.userinfo.to', options);
			},
			complete: undefined
		}));
	});
};
