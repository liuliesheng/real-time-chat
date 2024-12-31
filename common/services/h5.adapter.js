const $ = uni;

$.$$define(uni, 'getUserInfo', function(options) {
	options.success({
		userInfo: {
			avatarUrl: '/static/logo.png',
			nickName: '小白',
			gender: 1,
			province: '河南',
			city: '郑州',
			language: 'zh_CN',
		}
	});
});

$.$$define(uni, 'login', function(options) {
	options.success({
		code: new Date().getTime()
	});
});
