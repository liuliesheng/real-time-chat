export default {
	// 获取配置信息
	getHome(data, options) {
		return uni.$http.get('/index/index', data, options);
	},

	// 获取配置信息
	getConfig(data, options) {
		return uni.$http.get('/index/config', data, options);
	},

	// 获取关于我们
	getAbout(data, options = {}) {
		return uni.$http.get('/index/getabout', data, options);
	},

	// 提交反馈
	submitFeedback(data, options = {}) {
		return uni.$http.post('/index/createfeedback', data, options);
	},

	// 获取协议信息
	getAgreement(data, options = {}) {
		return uni.$http.get('/index/getagreement', data, options);
	},

	// 获取公告列表
	getNoticeList(data, options = {}) {
		return uni.$http.get('/index/getnoticelist', data, options);
	},
}
