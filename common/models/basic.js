export default {
	// 获取关于我们
	getAbout(data, options = {}) {
		return uni.$http.post('/index/about', data, options);
	},
	
	// 提交反馈
	submitFeedback(data, options = {}) {
		return uni.$http.post('/index/createFeedback', data, options);
	},
}
