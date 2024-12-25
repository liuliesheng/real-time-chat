import $ from "../../$";

// 重置App函数
if (typeof App !== "undefined") {
	const originalApp = App;

	App = function(appInstance) {
		const callbackMiddlewareHandle = function(callbackName, middlewareName) {
			if (!$.$middlewares[middlewareName]) return;
			const oldFunc = appInstance[callbackName] || function() {
			};
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
