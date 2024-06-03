import basicRequestInterceptor from "./https/basic.request.interceptor";
import formidRequestInterceptor from "./https/formid.request.interceptor";
import basicResponseInterceptor from "./https/basic.response.interceptor";

// http基础配置
module.exports = {
	defaults: {
		// baseURL: 'http://192.168.0.109',
		baseURL: 'https://www.xinranvip.top'
	},
	requestInterceptors: [
		basicRequestInterceptor,
		formidRequestInterceptor
	],
	responseInterceptors: [
		basicResponseInterceptor
	]
};
