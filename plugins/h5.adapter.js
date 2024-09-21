const $ = uni.$;

$.define('getUserInfo', function(options) {
	options.success({
		userInfo:{
			avatarUrl: '/static/images/icons/logo.png',
			nickName: '刘小晋啦',
			gender: 1,
			province: '河南',
			city: '郑州',
			language: 'zh_CN',
		}
	});
});
