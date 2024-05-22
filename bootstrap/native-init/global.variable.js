// 增加对对象添加新属性
Object.defineProperty(wx, '$define', {
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
wx.$define(wx, 'define', function(key, value, isEnumerable = true) {
	return wx.$define(wx, key, value, isEnumerable);
});

// 增加对微信原始API支持promise
wx.define('promise', new Proxy(wx, {
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
const systemInfo = wx.getSystemInfoSync();
wx.define('systemInfo', systemInfo);
wx.define('isDev', systemInfo.platform === 'devtools');
