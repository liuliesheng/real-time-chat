import $ from "../../../$";

// 扁平化支付宝接口
if (typeof my !== 'undefined' && typeof uni === 'undefined') {
// ui相关
	$.$define('showModal', function(options) {
		if (options.showCancel === false) {
			my.alert(options);
		} else {
			my.confirm(options);
		}
	});
	const showToast = my.showToast;
	$.$define('showToast', function(options) {
		options.content = options.title;
		showToast(options);
	});

	// 缓存相关
	const getStorageSync = my.getStorageSync;
	$.$define('getStorageSync', function(key) {
		return getStorageSync({key: key}).data;
	});

	const setStorageSync = my.setStorageSync;
	$.$define('setStorageSync', function(key, data) {
		return setStorageSync({key: key, data: data});
	});

	const removeStorageSync = my.removeStorageSync;
	$.$define('removeStorageSync', function(key) {
		return removeStorageSync({key: key});
	});

	// 用户相关
	$.$define('login', function(options) {
		my.getAuthCode({
			scopes: 'auth_base',
			success: (res) => {
				options.success && options.success({
					code: res.authCode
				});
			},
			fail: options.fail,
			complete: options.complete
		});
	});

	// 用户信息
	$.$define('getUserInfo', function(options) {
		my.getOpenUserInfo({
			success: (res) => {
				let userInfo = null;
				try {
					userInfo = JSON.parse(res.response).response;
				} catch (e) {
					console.warn(e);
					options.fail && options.fail(e);
				}

				if (userInfo) {
					options.success && options.success({
						userInfo: {
							nickName: userInfo.nickName,
							avatarUrl: userInfo.avatar,
							gender: userInfo.gender === 'm' ? 1 : 2,
							countryCode: userInfo.countryCode,
							province: userInfo.province,
							city: userInfo.city,
							language: 'zh_CN',
						},
						rawData: res.response
					});
				}
			},
			fail: options.fail,
			complete: options.complete
		});
	});
}
