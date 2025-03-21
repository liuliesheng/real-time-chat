/** @var {*} $ */
import $ from "../$";
import middleware from "../middleware";

// 事件处理
(function() {
	let events = null;

	try {
		events = require('../../common/events/index.js');

		if (typeof events === 'function') {
			events = events();
		}
	} catch (e) {
		console.warn("/common/events/index.js not found!");
		events = {};
	}

	// 监听事件
	for (const key in events) {
		if (!events.hasOwnProperty(key)) {
			continue;
		}

		console.log(key)

		$.$emitter.on(key, events[key]);
	}
})();

// 中间件处理
(function() {
	// 初始化中间件配置
	const middlewareList = {};
	let config = null;

	try {
		config = require('../../common/middlewares/index.js');

		if (typeof config === 'function') {
			config = config();
		}
	} catch (e) {
		console.warn("/common/middlewares/index.js not found!");
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
		if (!$[callbackName] || !middlewareList[middlewareName]) {
			return;
		}

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
})();

