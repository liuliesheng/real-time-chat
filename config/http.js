import basicRequestInterceptor from "./https/basic.request.interceptor";
import basicResponseInterceptor from "./https/basic.response.interceptor";

// http基础配置
const baseURL = 'http://localhost/api';
module.exports = {
	defaults: {
		baseURL: baseURL,
		loginUrl: baseURL + '/login/login/type/wechat',
		loginUserInfo: false,
	},
	requestInterceptors: [
		basicRequestInterceptor,
	],
	responseInterceptors: [
		basicResponseInterceptor
	]
};