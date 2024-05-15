import * as util from './util/index.js';
import {emitter, EventEmitter} from "./events.js";
import publisher from './publisher.js';
import middleware from './middleware.js';

import {http, Http} from './http.js';
import uploader from './uploader.js';
import Validate from './validate.js';

import system from './system.js';

if (!Promise.prototype.finally) {
	Promise.prototype.finally = function(callback) {
		let P = this.constructor;
		return this.then(
			value => P.resolve(callback(value)).then(() => value),
			reason => P.resolve(callback(reason)).then(() => {
				throw reason
			})
		);
	};
}

// 注入相关快捷方法
(function() {
	Object.defineProperty(wx, '$define', {
		enumerable: true,
		get: function() {
			return function(obj, key, value, isEnumerable = true) {
				Object.defineProperty(obj, key, {
					enumerable: isEnumerable,
					get: function() {
						return value;
					}
				});
			};
		}
	});
	wx.$define(wx, 'define', function(key, value, isEnumerable = true) {
		return wx.$define(wx, key, value, isEnumerable);
	});
	wx.define('require', function(file, errorTips = true) {
		try {
			return require(file);
		} catch (e) {
			if (errorTips) console.warn(e);
		}
		return null;
	});

	wx.define('random', util.random);
	wx.define('isEmpty', util.isEmpty);
	wx.define('isArray', util.isArray);
	wx.define('isObject', util.isObject);
	wx.define('toObject', util.toObject);
	wx.define('assign', util.assign);
	wx.define('collectionUtil', util.collectionUtil);
	wx.define('numberUtil', util.numberUtil);
	wx.define('stringUtil', util.stringUtil);
	wx.define('timeUtil', util.timeUtil);
	wx.define('functionUtil', util.functionUtil);

	wx.define('emitter', emitter);
	wx.define('EventEmitter', EventEmitter);
	wx.define('publisher', publisher);
	wx.define('middleware', middleware);

	wx.define('http', http);
	wx.define('Http', Http);
	wx.define('uploader', uploader);

	wx.define('Validate', Validate);
	wx.define('sys', system);

	wx.define('delayNavigateBack', function(delay, options) {
		setTimeout(function() {
			wx.navigateBack(options);
		}, delay);
	});

	console.printHelper = function() {
		console.groupCollapsed(`%c相关快捷操作`, "color:green;font-size:14px");
		console.log(`%c
wx.define(key,value,isEnumerable) 把一个变量绑定到wx
wx.$define(obj,key,value,isEnumerable) 把一个变量绑定到某个对象上
wx.require(file, errorTips = true) 引入模块

wx.random(min, max) 随机数
wx.isEmpty(obj) 变量是否为空 空字符串 null undefined 空对象 空数组
wx.isArray(obj) 是否是数组
wx.isObject(obj) 是否是对象
wx.toObject(obj) 转换成对象
wx.assign(target,...) 深度合并对象
wx.collectionUtil 集合工具类
wx.numberUtil 数字工具类
wx.stringUtil 字符串工具类
wx.timeUtil 时间日期工具类
wx.functionUtil 函数工具类

wx.emitter 默认监听器实例
wx.EventEmitter 创建监听器
wx.publisher(name) 生成一个发布/订阅实例
wx.middleware(handles = []) 生成一个中间件实例

wx.http(options) 默认网络请求实例
wx.http.get(url, data, options) 发起GET网络请求
wx.http.post(url, data, options) 发起POST网络请求
wx.Http 网络请求类
wx.uploader(files) 生成一个上传文件实例

wx.runtimeConfig 运行时配置信息
wx.config 配置信息
wx.middlewares 中间件列表

`, "color:#00f;font-size:12px;");
		// console.log("%c", "padding:70px 120px;line-height:200px;background-size:50px 50px;background:url('http://hbimg.b0.upaiyun.com/d57f34add1cdc182df3aab0777d0d88a1648073610e02-35Kp1Q_fw658') no-repeat;");
		console.groupEnd();
	};
	console.printHelper();
})();

//初始化基础配置
(function() {
	let config = wx.require('../config/app.js') || {};
	if (typeof config === 'function') config = config() || {};
	wx.define('runtimeConfig', __wxConfig || {});
	wx.define('config', config);
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
	wx.define('stopPullDownRefresh', function() {
		const that = this;
		return function() {
			innerAudioContext.play();
			stopPullDownRefresh.call(that);
		};
	});
})();

//初始化网络请求配置
(function() {
	const httpConfig = wx.require('/config/http.js', false) || {};
	if (typeof httpConfig === 'function') {
		httpConfig();
	} else {
		if (httpConfig.defaults) {
			util.assign(wx.http.defaults, httpConfig.defaults);
		}
		if (httpConfig.requestInterceptors) {
			httpConfig.requestInterceptors.forEach(interceptor => {
				if (typeof interceptor === 'function') interceptor.fulfilled = interceptor;
				wx.http.addRequestInterceptor(interceptor.fulfilled, interceptor.rejected)
			});
		}
		if (httpConfig.responseInterceptors) {
			httpConfig.responseInterceptors.forEach(interceptor => {
				if (typeof interceptor === 'function') interceptor.fulfilled = interceptor;
				wx.http.addResponseInterceptor(interceptor.fulfilled, interceptor.rejected)
			});
		}
	}
})();

//初始化中间件配置
(function() {
	const middlewareList = {};
	const middlewareConfig = wx.require('../config/middleware.js', false) || {};
	if (typeof middlewareConfig === 'function') {
		middlewareConfig();
	} else {
		for (const key in middlewareConfig) {
			wx.$define(middlewareList, key, middleware(middlewareConfig[key]));
		}
	}
	wx.define('middlewares', middlewareList);

	const oldApp = App;
	App = function(appInstance) {
		const callbackMiddlewareHandle = function(callbackName, middlewareName) {
			if (!middlewareList[middlewareName]) return;
			const oldFunc = appInstance[callbackName] || function() {
			};
			appInstance[callbackName] = function(options) {
				middlewareList[middlewareName](oldFunc, [options], appInstance);
			};
		};
		callbackMiddlewareHandle('onLaunch', 'appLaunch');
		oldApp(appInstance);
	};
	const callbackMiddlewareHandle = function(callbackName, middlewareName) {
		if (!wx[callbackName] || !middlewareList[middlewareName]) return;
		wx[callbackName](function(options) {
			middlewareList[middlewareName](function() {
				console.debug(callbackName, options)
			}, [options]);
		});
	};

	callbackMiddlewareHandle('onAppShow', 'appShow');
	callbackMiddlewareHandle('onAppHide', 'appHide');
	callbackMiddlewareHandle('onError', 'appError');
	callbackMiddlewareHandle('onPageNotFound', 'appPageNotFound');
	callbackMiddlewareHandle('onPageReload', 'appPageReload');
	callbackMiddlewareHandle('onAppRoute', 'appRoute');
	callbackMiddlewareHandle('onAppRouteDone', 'appRouteDone');
	callbackMiddlewareHandle('onAppUnhang', 'appUnhang');
	callbackMiddlewareHandle('onLocationChange', 'locationChange');
})();
