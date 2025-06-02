const jweixin = require('./libs/jweixin-module');

export default new Proxy({
	init: function() {
		return new Promise(function(resolve) {
			jweixin.config({});
			// jweixin.ready(resolve);
			resolve({});
		})
	},
	login: function(options = {}) {
		const scope = options.scope || 'snsapi_base'; // snsapi_userinfo
		const state = options.state || '';
		return this.init().then(function(res) {
			const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?` +
				`appid=${res.appId}` +
				`&redirect_uri=${res.redirectUri}` +
				`&response_type=code` +
				`&scope=${scope}` +
				`&state=${state}` +
				`#wechat_redirect`;
		});
	},
	requestPayment: function(options = {}) {
		return this.init().then(function() {
			return new Promise(function(resolve, reject) {
				jweixin.chooseWXPay({
					// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					timestamp: options.timestamp,
					// 支付签名随机串，不长于 32 位
					nonceStr: options.nonceStr,
					// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					package: options.package,
					// 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					signType: options.signType,
					// 支付签名
					paySign: options.paysign,
					success: resolve,
					fail: reject,
				});
			});
		});
	},
}, {
	get: function(target, key, receiver) {
		const wxFunc = Reflect.get(jweixin, key, receiver);
		return function(options = {}) {
			return target.init().then(function() {
				return new Promise(function(resolve, reject) {
					wxFunc(Object.assign(options || {}, {
						success: resolve,
						fail: reject
					}));
				});
			});
		}
	}
});
