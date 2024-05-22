import * as util from './util/index.js';
import {emitter, EventEmitter} from "./events.js";
import publisher from './publisher.js';
import middleware from './middleware.js';
import {http, Http} from './http.js';
import uploader from './uploader.js';
import Validate from './validate.js';
import system from './system.js';

import "./native-init/index";
import "./_print_info";

// 注入相关快捷方法
(function() {
	// 常用方法
	wx.define('random', util.random);
	wx.define('isEmpty', util.isEmpty);
	wx.define('isArray', util.isArray);
	wx.define('isObject', util.isObject);
	wx.define('toObject', util.toObject);
	wx.define('assign', util.assign);

	// 工具类
	wx.define('collectionUtil', util.collectionUtil);
	wx.define('numberUtil', util.numberUtil);
	wx.define('stringUtil', util.stringUtil);
	wx.define('timeUtil', util.timeUtil);
	wx.define('functionUtil', util.functionUtil);

	// 事件类
	wx.define('emitter', emitter);
	wx.define('EventEmitter', EventEmitter);
	wx.define('publisher', publisher);
	wx.define('middleware', middleware);

	// 请求类
	wx.define('http', http);
	wx.define('Http', Http);
	wx.define('uploader', uploader);

	// 其他
	wx.define('Validate', Validate);
	wx.define('sys', system);
	wx.define('delayNavigateBack', function(delay, options) {
		setTimeout(function() {
			wx.navigateBack(options);
		}, delay);
	});
})();

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

	wx.define('config', Object.assign(config, __wxConfig));
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
		wx.$define(middlewareList, key, middleware(config[key]));
	}
	wx.define('middlewares', middlewareList);

	// 注册中间件
	const callbackMiddlewareHandle = function(callbackName, middlewareName) {
		if (!wx[callbackName] || !middlewareList[middlewareName]) return;

		wx[callbackName](function(options) {
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
	let innerAudioContext = wx.config.stopPullDownRefreshAudio;
	if (!innerAudioContext) return;

	if (typeof innerAudioContext !== 'object') {
		innerAudioContext = wx.createInnerAudioContext();
		innerAudioContext.src = wx.config.stopPullDownRefreshAudio;
	}

	const stopPullDownRefresh = wx.stopPullDownRefresh;
	wx.define('stopPullDownRefresh', function(isPlay) {
		if (isPlay) innerAudioContext.play();
		stopPullDownRefresh.call(this);
	});
})();
