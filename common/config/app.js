// 应用基础配置
// 获取配置 $.$config
module.exports = {
	// 应用ID
	accessId: '6e447d93b9cd83fb049de15aa5c55d4e',
	// 应用密钥
	accessKey: 'sjda8YrbnNvmNL16jRHfv6MWhtZ0e61y',
	// 签名类型
	signType: 'md5',

	// 版本号
	version: '1.0',

	// 订阅消息模板ID
	tmplIds: [],

	// 自动订阅模板消息
	autoSubscribeTmplMsg: true,

	// 登录用户缓存标识
	userInfoKey: '__USER_INFO__',

	// 登录用户SessionId标识
	sessionIdKey: '__SESSION__',

	// 登录成功后的回调
	onLogged: function(res) {
		console.info('app.onLogged', res)
	},

	// 登出成功后的回调
	onLogout: function(res) {
		console.info('app.onLogout', res)
	},

	// 当前用户信息发生变更
	onUserChange: function({ detail: user }) {
		console.info('user info change:', user);
	},

	// 跳转地址
	onLinkTo: function(url, type) {},

	// 腾讯地图key列表
	QQMapKeys: [],

	// 下来刷新完成提示音
	stopPullDownRefreshAudio: '',
};
