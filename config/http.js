import basicRequestInterceptor from "./https/basic.request.interceptor";
import basicResponseInterceptor from "./https/basic.response.interceptor";
import login from './logins/basic.js';
// import login from './logins/account.js';

// http基础配置
const baseURL = 'http://localhost/api';
module.exports = {
	defaults: {
		baseURL: baseURL,

		login: login,
		loginDenyAuthMsg: '此操作需要您先授权！',
		loginFailedMsg: '登录失败，请稍后再试~',

		// basic login uses
		loginUrl: baseURL + '/login/login',
		loginUserInfo: false,

		// account login uses
		loginPage: '/pages/login/login'
	},
	requestInterceptors: [
		basicRequestInterceptor,
	],
	responseInterceptors: [
		basicResponseInterceptor
	]
};
