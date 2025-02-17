import $ from "../../$";

// 系统信息
const systemInfo = $.getSystemInfoSync();
$.$define('isDev', systemInfo.platform === 'devtools');

/**
 * 授权是否被拒绝
 * @param {*} res
 * @return {boolean}
 */
$.$define('isAuthDeny', function(err) {
	if (!err || !err.errMsg) return false;
	return err.errMsg.indexOf('fail auth deny') !== -1;
});

/**
 * 当前页面是否正在显示
 * @param {*} pageObj
 * @return {boolean}
 */
$.$define('isShowPage', function(pageObj) {
	return getCurrentPages()[0].route === pageObj.route;
});

/**
 * 获取当前页面
 * @return {*}
 */
$.$define('getCurrentPage', function() {
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];

	return currentPage.$vm ? currentPage.$vm : currentPage;
});

/**
 * 当前页面需要显示返回首页按钮
 * @return {*}
 */
$.$define('isShowHome', function() {
	const pages = getCurrentPages();
	return pages.length === 1;
});

/**
 * 返回上一页面实例
 * @param {function} [cb]
 * @return {boolean}
 */
$.$define('prePage', function(cb) {
	const pages = getCurrentPages();
	const prePage = pages[pages.length - 2];

	if (!prePage) {
		return null;
	}

	if (cb) {
		cb(prePage.$vm ? prePage.$vm : prePage);
	}

	return prePage.$vm ? prePage.$vm : prePage;
});

// 数组转对象
$.$define('arr2obj', function(prefix, data, initIndex = 0) {
	const result = {};
	for (let i = 0; i < data.length; i++) {
		const newKey = prefix + '[' + (i + initIndex) + ']';
		result[newKey] = data[i];
	}
	return result;
});

// 增加对微信原始API支持promise
$.$define('promise', new Proxy($, {
	get: function(target, key, receiver) {
		const wxFunc = Reflect.get(target, key, receiver);
		return function(options) {
			return new Promise(function(resolve, reject) {
				wxFunc(Object.assign(options || {}, {
					success: resolve,
					fail: reject
				}));
			});
		}
	}
}));


// 尝试订阅消息
$.$define('tryRequestSubscribeMessage', function(options) {
	return new Promise(function(resolve) {
		$.getSetting({
			withSubscriptions: true,
			success: (res) => {
				const subscriptionsSetting = res.subscriptionsSetting.itemSettings || {};

				let isAuth = true;
				options.tmplIds.forEach(temlId => {
					if (subscriptionsSetting[temlId] != 'accept') {
						isAuth = false;
					}
				});

				if (isAuth) {
					uni.requestSubscribeMessage({
						tmplIds: options.tmplIds,
						complete: resolve
					});
				} else {
					resolve({
						errMsg: 'Contains an unauthorized template message ID',
					});
				}

			},
			fail: resolve
		});
	});
});
