import $ from "../../$";
import defaultMixins from '../default.mixins';

// 重置App函数
if (typeof App !== "undefined") {
	const originalApp = App;

	App = function(appInstance) {
		const callbackMiddlewareHandle = function(callbackName, middlewareName) {
			if (!$.$middlewares[middlewareName]) {
				return;
			}

			const oldFunc = appInstance[callbackName] || function() {};

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
if (typeof Page !== "undefined" && typeof uni === 'undefined') {
	const originalPage = Page;
	const pageMixin = (function() {
		try {
			return require('../../../common/mixins/page.js');
		} catch (e) {
			console.warn("/common/mixins/page.js not found!");
			return {};
		}
	})();

	Page = function(options) {
		options = Object.assign({
			// 页面完成
			finish: function(result) {
				const pages = getCurrentPages();
				if (pages.length < 2) {
					return;
				}

				const page = pages[pages.length - 1];
				if (page.onFinishResult) {
					uni.navigateBack({
						success: function() {
							page.onFinishResult(result);
						}
					});
				}
			}
		}, defaultMixins, pageMixin, options);
		originalPage(options);
	};
}

// 重置Component函数
if (typeof Component !== "undefined" && typeof uni === 'undefined') {
	const originalComponent = Component;
	const componentMixin = (function() {
		try {
			return require('../../../common/mixins/component.js');
		} catch (e) {
			console.warn("/common/mixins/component.js not found!");
			return {};
		}
	})();

	Component = function(options) {
		options.methods = Object.assign({}, defaultMixins, componentMixin.methods || {}, options.methods || {});
		options = Object.assign({}, componentMixin, options);
		originalComponent(options);
	};
}
