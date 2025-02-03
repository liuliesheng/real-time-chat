import $ from "../../$";

// 重置App函数
if (typeof App !== "undefined") {
	const originalApp = App;

	App = function(appInstance) {
		const callbackMiddlewareHandle = function(callbackName, middlewareName) {
			if (!$.$middlewares[middlewareName]) return;
			const oldFunc = appInstance[callbackName] || function() {};
			// console.log(oldFunc);
			appInstance[callbackName] = function(options) {
				console.groupCollapsed(middlewareName, options);
				$.$middlewares[middlewareName](oldFunc, options, appInstance);
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
}


// 重置Page函数
if (typeof Page !== "undefined") {
	const originalPage = Page;
	Page = function(options) {
		const pageMixin = (function() {
			try {
				return require('../../../common/config/page.js');
			} catch (e) {
				console.warn("/common/config/page.js not found!");
				return {};
			}
		})();

		options = Object.assign({}, pageMixin, options);
		originalPage(options);
	};
}

// 重置Component函数
if (typeof Component !== "undefined") {
	const originalComponent = Component;
	Component = function(options) {
		const componentMixin = (function() {
			try {
				return require('../../../common/config/component.js');
			} catch (e) {
				console.warn("/common/config/component.js not found!");
				return {};
			}
		})();

		options.methods = Object.assign({}, componentMixin.methods || {}, options.methods || {});

		options = Object.assign({}, componentMixin, options);

		originalComponent(options);
	};
}
