import $ from "../../../$";

// 系统信息
const systemInfo = $.getSystemInfoSync();
$.$define('systemInfo', systemInfo);
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
 * 返回上一页面实例
 * @param {*} pageObj
 * @return {boolean}
 */
$.$define('prePage', function(pageObj) {
	const pages = getCurrentPages();
	const prePage = pages[pages.length - 2];

	// #ifdef H5
	return prePage;
	// #endif

	return prePage.$vm;
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
