import $ from '../../bootstrap/$';

// http基础配置
// const baseURL = typeof HTTP_BASE_URL !== 'undefined' ? HTTP_BASE_URL : 'https://fn.nlplant.cn/api';
const baseURL = 'http://mall.test.com/api';
module.exports = {
	// 默认选项配置
	defaults: {
		// 网络请求基础URL
		baseURL: baseURL,

		// 是否返回原始数据
		returnRaw: false,

		// 是否显示错误提示语
		isShowErrorTips: true,
	},

	// 登录授权
	// 使用小程序原始登录器
	// #ifdef MP
	login: 'weapp', // 使用小程序原始登录器
	// #endif

	// 使用账户登录器
	// #ifdef H5
	login: uni.$platform.isWechatBrowser ? 'official' : 'account', // 使用公众号授权或账户登录
	// #endif

	// 小程序授权相关配置
	// #ifdef MP-WEIXIN
	weappLoginUrl: baseURL + '/weapp_login', // 微信小程序授权地址
	// #endif
	// #ifdef MP-ALIPAY
	weappLoginUrl: baseURL + '/ali_mini_login', // 支付包小程序授权地址
	// #endif
	// #ifdef MP-MP-TOUTIAO
	weappLoginUrl: baseURL + '/toutiao_login', // 字节跳动小程序授权地址
	// #endif
	loginUserInfo: true, // 登录时是否获取用户信息

	// 普通账号授权相关配置
	loginUrl: baseURL + '/login', // 登录地址
	loginPage: '/pages/auth/login', // 自定义登录页面地址

	// 微信公众号授权地址
	officialConfigUrl: 'wechat_official/config', // 公众号配置接口地址
	officialAuthUrl: 'wechat_official/authorize', // 公众号授权接口地址

	// 所有请求回调
	onRequest: function(config) {},

	// 业务成功码
	successCode: 1,
	// 业务成功处理器（所有通过的业务请求，都会回调此函数）
	onSuccess: function(data, response) {},

	// 默认提示语
	loadingText: '请稍后...',
	errorTips: '网络错误，请稍后~', // 默认错误提示语
	loginAuthTips: '此操作需要您授权基本信息', // 授权提示语
	loginAuthFailedTips: '请先授权后，进行重试~', // 授权失败提示语
	loginFailedMsg: '登录失败，请稍后再试~', // 登录失败提示语

	// 登录失效错误码
	loginInvalidCode: -1,
	// 登录最大尝试次数
	loginMaxCount: 1,
	// 登录超时操作
	onLoginTimout: function(config, response) {
		$.showModal({
			content: '登录超时，请稍后再试~',
			showCancel: false
		});
	},

	// 无权限错误码
	unauthorizedCode: -10,
	// 无权限处理器
	onUnauthorized: function(config, response) {
		uni.$http.resolveModal(config)({
			title: '温馨提示',
			content: '暂无权限，详细请查看权限说明？',
			showCancel: true,
			confirmColor: '#2E8B57',
			confirmText: '了解一下',
			success: (res) => {
				if (res.cancel) {
					return;
				}

				$.navigateTo({
					url: '/pages/auth/unauthorized'
				});
			}
		});
	},

	// 其他业务处理器
	logicErrors: {
		// '40000': function(data, response) { // 数据验证错误
		// }
	},

	// 默认HTTP错误处理器
	statusErrors: {
		'404': function(config, response) {
			if (config.method.toUpperCase() === 'GET') {
				$.navigateBack();
			}
		},
		// '500': function(response) {
		// },
	},

	// 请求拦截器
	requestInterceptors: [
		uni.$http.basicRequestInterceptor,
	],

	// 响应拦截器
	responseInterceptors: [
		uni.$http.basicResponseInterceptor
	]
};
