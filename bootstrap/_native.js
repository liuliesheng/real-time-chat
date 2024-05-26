// 重置Page函数
(function() {
	const originalPage = Page;
	Page = function(options) {
		const pageMixin = (function() {
			try {
				return require('../config/page.js');
			} catch (e) {
				return {};
			}
		})();

		originalPage(Object.assign({}, pageMixin, options));
	};
})();


// 重置App函数
(function() {
	const originalApp = App;
	App = function(appInstance) {
		const callbackMiddlewareHandle = function(callbackName, middlewareName) {
			if (!wx.middlewares[middlewareName]) return;
			const oldFunc = appInstance[callbackName] || function() {
			};
			appInstance[callbackName] = function(options) {
				console.groupCollapsed(middlewareName, options);
				wx.middlewares[middlewareName](oldFunc, options, appInstance);
				console.groupEnd();
			};
		};

		callbackMiddlewareHandle('onLaunch', 'appLaunch');
		callbackMiddlewareHandle('onShow', 'appShow');
		callbackMiddlewareHandle('onHide', 'appHide');
		callbackMiddlewareHandle('onError', 'appError');
		callbackMiddlewareHandle('onPageNotFound', 'appPageNotFound');

		originalApp(appInstance);
	};
})();

// 增加Promise最终方法
if (!Promise.prototype.finally) {
	Promise.prototype.finally = function(callback) {
		let P = this.constructor;
		return this.then(
			value => P.resolve(callback(value)).then(() => value),
			reason => P.resolve(callback(reason)).then(() => {
				throw reason
			})
		);
	};
}

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
