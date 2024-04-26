import {collectionUtil, functionUtil, isEmpty, numberUtil, random, stringUtil, timeUtil} from './util/index.js';
import {emitter, EventEmitter} from "./events.js";
import publisher from './publisher.js';
import middleware from './middleware.js';

import {http, Http} from './http.js';
import uploader from './uploader.js';
import Validate from './validate.js';

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

	wx.define('random', random);
	wx.define('isEmpty', isEmpty);
	wx.define('collectionUtil', collectionUtil);
	wx.define('numberUtil', numberUtil);
	wx.define('stringUtil', stringUtil);
	wx.define('timeUtil', timeUtil);
	wx.define('functionUtil', functionUtil);

	wx.define('emitter', emitter);
	wx.define('EventEmitter', EventEmitter);
	wx.define('publisher', publisher);
	wx.define('middleware', middleware);

	wx.define('http', http);
	wx.define('Http', Http);
	wx.define('uploader', uploader);

	wx.define('Validate', Validate);

	console.printHelper = function() {
		console.groupCollapsed(`%c相关快捷操作`, "color:green;font-size:14px");
		console.log(`%cwx.define(key,value,isEnumerable) 把一个变量绑定到wx
wx.$define(obj,key,value,isEnumerable) 把一个变量绑定到某个对象上
wx.listener 监听器实例
wx.publisher(name, handles = []) 生成一个发布/订阅实例
wx.middleware(handles = []) 生成一个中间件实例
wx.http(options) 发起网络请求
wx.http.get(url, data, options) 发起GET网络请求
wx.http.post(url, data, options) 发起POST网络请求
wx.addRequestInterceptor(fulfilled, rejected) 添加请求拦截器
wx.removeRequestInterceptor(number) 移除拦截器
wx.addResponseInterceptor(fulfilled, rejected) 添加返回拦截器
wx.removeResponseInterceptor(number) 移除拦截器
wx.uploader(files) 生成一个上传文件实例
wx.require(file, errorTips = true) 引入模块
wx.config 配置信息
wx.middlewares 中间件列表`, "color:#00f;font-size:14px;");
		console.log("%c", "padding:70px 120px;line-height:200px;background-size:50px 50px;background:url('http://hbimg.b0.upaiyun.com/d57f34add1cdc182df3aab0777d0d88a1648073610e02-35Kp1Q_fw658') no-repeat;");
		console.groupEnd();
	};
	console.printHelper();
})();

//初始化基础配置
(function() {
	let config = wx.require('../config/app.js') || {};
	if (typeof config === 'function') config = config(__wxConfig) || {};
	wx.$define(config, 'runtimeConfig', __wxConfig);
	wx.define('config', config);
})();

//初始化网络请求配置
(function() {
	const httpConfig = wx.require('/config/http.js', false) || {};
	if (typeof httpConfig === 'function') {
		httpConfig(__wxConfig);
	} else {
		if (httpConfig.defaults) {
			Object.assign(wx.http.defaults, httpConfig.defaults);
		}
		if (httpConfig.requestInterceptors) {
			httpConfig.requestInterceptors.forEach(interceptor => wx.addRequestInterceptor(interceptor));
		}
		if (httpConfig.responseInterceptors) {
			httpConfig.responseInterceptors.forEach(interceptor => wx.addResponseInterceptor(interceptor));
		}
	}
})();

//初始化中间件配置
(function() {
	const middlewares = {};
	const middlewareConfig = wx.require('../config/middleware.js', false) || {};
	if (typeof middlewareConfig === 'function') {
		middlewareConfig($, __wxConfig);
	} else {
		for (const key in middlewareConfig) {
			wx.$define(middlewares, key, middleware(middlewareConfig[key]));
		}
	}
	wx.define('middlewares', middlewares);

	const callbackMiddlewareHandle = function(callbackName, middlewareName) {
		if (!$[callbackName]) return;
		$[callbackName](options => {
			if (middlewares[middlewareName]) {
				middlewares[middlewareName](() => {
				}, options);
			}
		});
	};
	callbackMiddlewareHandle('onAppShow', 'appShow');
	callbackMiddlewareHandle('onAppHide', 'appHide');
	callbackMiddlewareHandle('onAppRoute', 'appRoute');
	callbackMiddlewareHandle('onAppRouteDone', 'appRouteDone');
	callbackMiddlewareHandle('onAppUnhang', 'appUnhang');
})();
