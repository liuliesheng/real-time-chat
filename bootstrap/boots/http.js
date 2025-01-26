import $ from "../$";
import { Http, http } from "../http";
import uploader from "../uploader";
import * as util from "../util/index";

import * as logins from '../logins';

// 请求类
$.$define('http', http);
$.$define('Http', Http);
$.$define('uploader', uploader);
$.$define('logins', logins);


//初始化网络请求配置
let config = null;

try {
	config = require('../../common/config/http.js');

	if (typeof config === 'function') {
		config = config();
	}
} catch (e) {
	console.warn("/common/config/http.js not found!");
	config = {};
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
