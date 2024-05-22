// 重置App函数
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
