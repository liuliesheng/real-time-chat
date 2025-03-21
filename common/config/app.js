// 应用基础配置
// 获取配置 $.$config
module.exports = {
	// 应用ID
	access_id: '6e447d93b9cd83fb049de15aa5c55d4e',

	// 版本号
	version: '1.0',

	// 订阅消息模板ID
	tmplIds: [
		'pUo_htDxnZx9x2M8EhmlQUz9sjtASI4GUfhwFSe99GY'
	],

	// 自动订阅模板消息
	autoSubscribeTmplMsg: true,

	// 下来刷新完成提示音
	stopPullDownRefreshAudio: '',

	// 登录用户缓存标识
	userInfoKey: '__USER_INFO__',

	// 登录用户SessionId标识
	sessionIdKey: '__SESSION__',

	// 当前用户信息发生变更
	onUserChange: function(user) {
		console.info('user info change:', user);
	},

	// 跳转地址
	onLinkTo: function(url, type) {
	},

	// 腾讯地图key列表
	QQMapKeys: []
};
