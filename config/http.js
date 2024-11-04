import basicRequestInterceptor from "./https/basic.request.interceptor";
import basicResponseInterceptor from "./https/basic.response.interceptor";

// http基础配置
const baseURL = 'http://127.0.0.1/api';
module.exports = {
	defaults: {
		baseURL: baseURL,
		loginUrl: baseURL + 'login/login/type/wechat'
	},
	requestInterceptors: [
		basicRequestInterceptor,
	],
	responseInterceptors: [
		basicResponseInterceptor
	]
};
