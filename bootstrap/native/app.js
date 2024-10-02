if (typeof App !== "undefined") {
	// 重置App函数
	const originalApp = App;
	App = function(appInstance) {
		const callbackMiddlewareHandle = function(callbackName, middlewareName) {
			if (!uni.$middlewares[middlewareName]) return;
			const oldFunc = appInstance[callbackName] || function() {};
			appInstance[callbackName] = function(options) {
				console.groupCollapsed(middlewareName, options);
				uni.$middlewares[middlewareName](oldFunc, options, appInstance);
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
