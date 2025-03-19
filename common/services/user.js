import login from "../config/https/login";

const $ = uni;

// 监听获取用户信息事件
$.$emitter.on('sys.getUserInfo.to', function(options) {
	const page = $.$getCurrentPage();
	if (page.onLogin && page.onLogin(options) !== false) {
		return;
	}
	
	$.navigateTo({
		url: '/pages/auth/auth'
	});
});

// 注入用户登录启
$.$define('logged', function(options) {
	const userInfo = getApp().globalData.userInfo;
	if (userInfo) {
		return Promise.resolve(userInfo);
	}

	return login(options);
});

// 注入用户是否已登录
$.$define('isLogged', function(options) {
	const userInfo = getApp().globalData.userInfo;
	return !!userInfo;
});
