// 监听获取用户信息事件
uni.$emitter.on('sys.getUserInfo.to', function() {
	uni.navigateTo({
		url: '/pages/user/auth'
	});
});
