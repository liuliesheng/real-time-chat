import basicRequestInterceptor from "./https/basic.request.interceptor";
import formidRequestInterceptor from "./https/formid.request.interceptor";
import basicResponseInterceptor from "./https/basic.response.interceptor";

// http基础配置
module.exports = {
	defaults: {
		// baseURL: 'http://127.0.0.1',
		baseURL: 'https://product.domin.com'
	},
	requestInterceptors: [
		basicRequestInterceptor,
		formidRequestInterceptor
	],
	responseInterceptors: [
		basicResponseInterceptor
	]
};
