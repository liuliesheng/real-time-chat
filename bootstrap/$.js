const platform = {
	isWeapp: false,
	isAliWeapp: false,
	isSwanWeapp: false,
	isTouTiaoWeapp: false,
	isWechatWeapp: false,
	isBrowser: false,
	isWechatBrowser: false,
	isApp: false,
	isQuickapp: false,
};

// 获取全局对象
const $ = (() => {
	if (typeof my !== 'undefined') {
		platform.isAliWeapp = true;
		return my;
	} else if (typeof swan !== 'undefined') {
		platform.isSwanWeapp = true;
		return swan;
	} else if (typeof tt !== 'undefined') {
		platform.isTouTiaoWeapp = true;
		return tt;
	} else if (typeof wx !== 'undefined') {
		if (typeof uni !== 'undefined') {
			//#ifdef APP-PLUS || APP-PLUS-NVUE
			platform.isApp = true;
			platform.name = 'app';
			//#endif
			//#ifdef H5
			platform.isBrowser = true;
			platform.name = 'browser';
			// 是否是微信环境
			platform.isWechatBrowser = navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
			//#endif
			//#ifdef MP
			platform.isWeapp = true;
			//#endif
			//#ifdef MP-WEIXIN
			platform.isWechatWeapp = true;
			platform.name = 'wechat-weapp';
			//#endif
			//#ifdef MP-ALIPAY
			platform.isAliWeapp = true;
			platform.name = 'alipay-weapp';
			//#endif
			//#ifdef MP-BAIDU
			platform.isSwanWeapp = true;
			platform.name = 'swan-weapp';
			//#endif
			//#ifdef MP-TOUTIAO
			platform.isTouTiaoWeapp = true;
			platform.name = 'toutiao-weapp';
			//#endif
			//#ifdef MP-QQ
			platform.isQQWeapp = true;
			platform.name = 'qq-weapp';
			//#endif
			//#ifdef MP-360
			platform.is360Weapp = true;
			platform.name = '360-weapp';
			//#endif
			//#ifdef QUICKAPP-WEBVIEW || QUICKAPP-WEBVIEW-UNION || QUICKAPP-WEBVIEW-HUAWEI
			platform.isQuickapp = true;
			platform.name = 'quickapp';
			//#endif
		}
		return wx;
	}
	throw new Error('未适配的客户端，请手动在此处理');
})();

// 对全局对象添加新属性
Object.defineProperty($, '$$define', {
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

// 使用回调函数返回属性值
Object.defineProperty($, '$$defineOfFunc', {
	enumerable: true,
	get: function() {
		return function(obj, key, value, isEnumerable = true) {
			Object.defineProperty(obj, key, {
				enumerable: isEnumerable,
				get: value
			});
		};
	}
});


// 增加wx对象添加新属性
$.$$define($, '$define', function(key, value, isEnumerable = true) {
	$.$$define($, '$' + key, value, isEnumerable);
});

// 增加wx对象使用回调函数返回属性值
$.$define('defineOfFunc', function(key, value, isEnumerable = true) {
	$.$$defineOfFunc($, '$' + key, value, isEnumerable);
});

// 定义平台
$.$define('platform', Object.freeze(platform));

export default $;
