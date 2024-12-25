/** @var {*} $ */
import $ from "../$";
import middleware from "../middleware";

// 初始化中间件配置
const middlewareList = {};
let config = null;

try {
	config = require('../../common/config/middleware.js');

	if (typeof config === 'function') {
		config = config();
	}
} catch (e) {
	console.warn("/common/config/middleware.js not found!");
	config = {};
}

// 生成中间件
for (const key in config) {
	if (!config.hasOwnProperty(key)) {
		continue;
	}
	$.$$define(middlewareList, key, middleware(config[key]));
}
$.$define('middlewares', middlewareList);

// 注册中间件
const callbackMiddlewareHandle = function(callbackName, middlewareName) {
	if (!$[callbackName] || !middlewareList[middlewareName]) return;

	$[callbackName](function(options) {
		console.groupCollapsed(middlewareName, options);
		middlewareList[middlewareName](function() {
			// console.debug(middlewareName, 'options', options);
		}, options);
		console.groupEnd();
	});
};

callbackMiddlewareHandle('onAppUnhang', 'appUnhang');
callbackMiddlewareHandle('onPageReload', 'appPageReload');
callbackMiddlewareHandle('onAppRoute', 'appRoute');
callbackMiddlewareHandle('onAppRouteDone', 'appRouteDone');
callbackMiddlewareHandle('onLocationChange', 'locationChange');
