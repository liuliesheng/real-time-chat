import $ from "../$";
import middleware from "../middleware";
import App from '../../App.vue';

// 中间件处理
(function() {
	// 初始化中间件配置
	const middlewareList = {};
	let middlewares = null;

	try {
		middlewares = require('../../common/middlewares/index.js');

		if (typeof middlewares === 'function') {
			middlewares = middlewares();
		}
	} catch (e) {
		console.warn("/common/middlewares/index.js not found!");
		middlewares = {};
	}

	// 生成中间件
	for (const key in middlewares) {
		if (!middlewares.hasOwnProperty(key)) {
			continue;
		}
		$.$$define(middlewareList, key, middleware(middlewares[key]));
	}
	$.$define('middlewares', middlewareList);

	// #ifndef MP
	const registerAppMiddleware = function(callbackName, middlewareName) {
		if (!$.$middlewares[middlewareName]) {
			return;
		}

		const oldFunc = App[callbackName] || function() {};
		App[callbackName] = function(options) {
			console.groupCollapsed(middlewareName, options);
			$.$middlewares[middlewareName](oldFunc, options, this);
			console.groupEnd();
		};
	};
	registerAppMiddleware('onLaunch', 'appLaunch');
	registerAppMiddleware('onShow', 'appShow');
	registerAppMiddleware('onHide', 'appHide');
	registerAppMiddleware('onError', 'appError');
	registerAppMiddleware('onPageNotFound', 'appPageNotFound');
	// #endif

	// 注册中间件
	const registerMiddleware = function(callbackName, middlewareName) {
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
	registerMiddleware('onAppUnhang', 'appUnhang');
	registerMiddleware('onPageReload', 'appPageReload');
	registerMiddleware('onAppRoute', 'appRoute');
	registerMiddleware('onAppRouteDone', 'appRouteDone');
	registerMiddleware('onLocationChange', 'locationChange');
})();


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

		$.$emitter.on(key, events[key]);
	}
})();
