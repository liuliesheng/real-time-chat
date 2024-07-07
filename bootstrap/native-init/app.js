import $ from "./global.ext";

// 重置App函数
const originalApp = App;
const newApp = function(appInstance) {
	const callbackMiddlewareHandle = function(callbackName, middlewareName) {
		if (!$.middlewares[middlewareName]) return;
		const oldFunc = appInstance[callbackName] || function() {
		};
		appInstance[callbackName] = function(options) {
			console.groupCollapsed(middlewareName, options);
			$.middlewares[middlewareName](oldFunc, options, appInstance);
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


try {
	App = newApp;
} catch (e) {
	$.define('App', newApp);
}
