import listener from './listener.js';
import request from './request.js';
import uploader from './uploader.js';
import publisher from './publisher.js';
import middleware from './middleware.js';

// 获取全局环境
import {
    $,
    runtimeConfig,
    define
} from './sys-adapter.js';

// 注入相关快捷方法
define($, 'define', function(key, value, isEnumerable = true) {
    return define($, key, value, isEnumerable);
});
define($, '$define', function(obj, key, value, isEnumerable = true) {
    return define(obj, key, value, isEnumerable);
});
$.define('listener', listener);
$.define('publisher', publisher);
$.define('middleware', middleware);
$.define('http', request);
$.define('addRequestInterceptor', request.addRequestInterceptor);
$.define('removeRequestInterceptor', request.removeRequestInterceptor);
$.define('addResponseInterceptor', request.addResponseInterceptor);
$.define('removeResponseInterceptor', request.removeResponseInterceptor);
$.define('uploader', uploader);
$.define('require', function(file, errorTips = true) {
    try {
        return require(file);
    } catch (e) {
        if (errorTips) console.warn(e);
    }
    return null;
});
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

//初始化基础配置
(function() {
    let config = $.require('../config/app.js') || {};
	if (typeof config === 'function') config = config($, runtimeConfig) || {};
	$.$define(config, 'runtimeConfig', runtimeConfig);
    $.define('config', config);
})();

//初始化网络请求配置
(function() {
    const httpConfig = $.require('/config/http.js', false) || {};
    if (typeof httpConfig === 'function') {
        httpConfig($, __wxConfig);
    } else {
        if (httpConfig.defaults) {
            Object.assign($.http.defaults, httpConfig.defaults);
        }
        if (httpConfig.requestInterceptors) {
            httpConfig.requestInterceptors.forEach(interceptor => $.addRequestInterceptor(interceptor));
        }
        if (httpConfig.responseInterceptors) {
            httpConfig.responseInterceptors.forEach(interceptor => $.addResponseInterceptor(interceptor));
        }
    }
})();

//初始化中间件配置
(function() {
    const middlewares = {};

    const middlewareConfig = $.require('../config/middleware.js', false) || {};
    if (typeof middlewareConfig === 'function') {
        middlewareConfig($, __wxConfig);
    } else {
        for (const key in middlewareConfig) {
            $.$define(middlewares, key, middleware(middlewareConfig[key]));
        }
    }
    $.define('middlewares', middlewares);

    const callbackMiddlewareHandle = function(callbackName, middlewareName) {
        if (!$[callbackName]) return;
        $[callbackName](options => {
            if (middlewares[middlewareName]) {
                middlewares[middlewareName](() => {}, options);
            }
        });
    };
    callbackMiddlewareHandle('onAppShow', 'appShow');
    callbackMiddlewareHandle('onAppHide', 'appHide');
    callbackMiddlewareHandle('onAppRoute', 'appRoute');
    callbackMiddlewareHandle('onAppRouteDone', 'appRouteDone');
    callbackMiddlewareHandle('onAppUnhang', 'appUnhang');
})();