import $ from "../../$";

/**
 * 调用并授权地理位置权限
 * @param {string} invokeFunc
 * @param {*} options
 */
function invokeLocationAndAuth(invokeFunc, options) {
	return $.$promise[invokeFunc](options).catch(function(err) {
		err.isAuthDeny = $.$isAuthDeny(err);
		if (err.isAuthDeny) {
			$.showModal({
				title: '温馨提示',
				content: '此操作需要你的授权，我们不会泄露你的隐私，操作方法：【右上角···->设置->允许位置信息】',
				showCancel: false,
			});
		} else if (err.errMsg.indexOf("require permission") !== -1) {
			$.showModal({
				title: '温馨提示',
				content: '此操作需要你的开启手机定位，我们不会泄露你的隐私',
				showCancel: false,
			});
		} else {
			$.showModal({
				title: '温馨提示',
				content: '授权地理位置失败：' + err.errMsg,
				showCancel: false,
			});
		}
		return Promise.reject(err);
	});
}

// 优化获取定位能力
let currentLocation = null;
$.$define('startLocationUpdate', function(options = {}) {
	if (this.inited) {
		return;
	}

	console.log('初始化定位能力！');

	this.inited = true;
	$.startLocationUpdate(options);
	$.onLocationChange(function(res) {
		console.log('更新位置信息：', res);
		currentLocation = res;
	});
});

let locationPromise = null;
let prevLocationTime = 0;
/**
 * 获取当前位置信息
 * @param {*} options
 * @return Promise<*>
 */
$.$define('getLocation', function(options) {
	const now = parseInt(new Date().getTime() / 1000);
	if (!locationPromise) {
		locationPromise = invokeLocationAndAuth('getLocation', options).then((res) => {
			return res;
		}, () => {
			locationPromise = null;
		});
	} else if (prevLocationTime < now - 35) {
		console.log('刷新定位信息...');
		invokeLocationAndAuth('getLocation', options).then((res) => {
			locationPromise = Promise.resolve(res);
		});
	}

	prevLocationTime = now;

	return locationPromise;
});

/**
 * 打开地图
 * @param {*} options
 * @return Promise<*>
 */
$.$define('openLocation', function(options) {
	return invokeLocationAndAuth('openLocation', options);
});

/**
 * 获取当前位置信息
 * @param {*} options
 * @return Promise<*>
 */
$.$define('chooseLocation', function(options) {
	return invokeLocationAndAuth('chooseLocation', options);
});
