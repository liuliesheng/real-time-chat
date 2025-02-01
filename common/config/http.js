import basicRequestInterceptor from "./https/basic.request.interceptor";
import basicResponseInterceptor from "./https/basic.response.interceptor";

// http基础配置
const baseURL = 'http://mall.test.com/api';
module.exports = {
	defaults: {
		baseURL: baseURL,
		returnRaw: false,

		// Login
		login: uni.$logins.basic,
		loginDenyAuthMsg: '此操作需要您先授权！',
		loginFailedMsg: '登录失败，请稍后再试~',

		// basic login uses
		loginUrl: baseURL + '/weapp_login',
		loginUserInfo: false,

		// account login uses
		loginPage: '/pages/auth/login'
	},
	requestInterceptors: [
		basicRequestInterceptor,
	],
	responseInterceptors: [
		basicResponseInterceptor
	]
};
