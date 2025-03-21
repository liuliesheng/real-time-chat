// 全局事件监听
module.exports = {
	// 监听用户授权跳转
	'sys.getUserInfo.to': function() {
		console.log('sys.getUserInfo.to...');
		const page = $.$getCurrentPage();
		if (page.onLogin && page.onLogin(options) !== false) {
			return;
		}

		$.navigateTo({
			url: '/pages/auth/auth'
		});
	}
};
