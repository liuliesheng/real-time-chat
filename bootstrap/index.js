import $ from "./native/index";

import * as util from './util/index.js';
import {emitter, EventEmitter} from "./events.js";
import publisher from './publisher.js';
import middleware from './middleware.js';
import {http, Http} from './http.js';
import uploader from './uploader.js';
import Validate from './validate.js';
import htmlParser from './html-parser.js';
import BigNumber from './bignumber.js';

// 注入相关快捷方法
// 常用方法
$.$define('random', util.random);
$.$define('isEmpty', util.isEmpty);
$.$define('isArray', util.isArray);
$.$define('isObject', util.isObject);
$.$define('toObject', util.toObject);
$.$define('assign', util.assign);

// 工具类
$.$define('collectionUtil', util.collectionUtil);
$.$define('stringUtil', util.stringUtil);
$.$define('numberUtil', util.numberUtil);
$.$define('timeUtil', util.timeUtil);
$.$define('functionUtil', util.functionUtil);
$.$define('BigNumber', BigNumber);

// 事件类
$.$define('emitter', emitter);
$.$define('EventEmitter', EventEmitter);
$.$define('publisher', publisher);
$.$define('middleware', middleware);

// 请求类
$.$define('http', http);
$.$define('Http', Http);
$.$define('uploader', uploader);

// 其他
$.$define('Validate', Validate);
$.$define('htmlParser', htmlParser);
$.$define('showTips', function(msg) {
	$.showToast({
		title: msg,
		icon: 'none'
	});
});

//初始化基础配置
(function() {
	let config = null;

	try {
		config = require('../config/app.js');
	} catch (e) {
		console.warn(e);
		config = {};
	}

	if (typeof config === 'function') {
		config = config() || {};
	}

	let appConfig = {};
	if (typeof __wxConfig !== 'undefined') {
		appConfig = __wxConfig;
	}

	$.$define('config', Object.assign(config, appConfig));
})();

//初始化网络请求配置
(function() {
	let config = null;

	try {
		config = require('../config/http.js');
	} catch (e) {
		console.warn(e);
		config = {};
	}

	if (typeof config === 'function') {
		config = config();
	}

	// 默认配置
	if (config.defaults) {
		util.assign(http.defaults, config.defaults);
	}

	// 请求拦截器
	if (config.requestInterceptors) {
		config.requestInterceptors.forEach(interceptor => {
			if (typeof interceptor === 'function') {
				interceptor.fulfilled = interceptor;
			}
			http.addRequestInterceptor(interceptor.fulfilled, interceptor.rejected)
		});
	}

	// 响应拦截器
	if (config.responseInterceptors) {
		config.responseInterceptors.forEach(interceptor => {
			if (typeof interceptor === 'function') {
				interceptor.fulfilled = interceptor;
			}
			http.addResponseInterceptor(interceptor.fulfilled, interceptor.rejected)
		});
	}
})();

// 初始化中间件配置
(function() {
	const middlewareList = {};
	let config = null;

	try {
		config = require('../config/middleware.js');
	} catch (e) {
		console.warn(e);
		config = {};
	}

	if (typeof config === 'function') {
		config = config();
	}

	// 生成中间件
	for (const key in config) {
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
})();

// 重写停止下拉刷新方法
(function() {
	let innerAudioContext = $.$config.stopPullDownRefreshAudio;
	if (!innerAudioContext) return;

	if (typeof innerAudioContext !== 'object') {
		innerAudioContext = $.createInnerAudioContext();
		innerAudioContext.src = $.$config.stopPullDownRefreshAudio;
	}

	const stopPullDownRefresh = $.stopPullDownRefresh;
	$.$$define($, 'stopPullDownRefresh', function(isPlay) {
		if (isPlay) innerAudioContext.play();
		stopPullDownRefresh.call(this);
	});
})();
