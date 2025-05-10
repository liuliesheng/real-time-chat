export default {
	// 获取配置信息
	getConfig(data, options) {
		return uni.$http.get('/index/config', data, options);
	},

	// 获取关于我们
	getAbout(data, options = {}) {
		return uni.$http.get('/index/about', data, options);
	},

	// 提交反馈
	submitFeedback(data, options = {}) {
		return uni.$http.post('/index/createfeedback', data, options);
	},

	// 获取协议信息
	getAgreement(data, options = {}) {
		return uni.$http.get('/index/agreement', data, options);
	},
}
